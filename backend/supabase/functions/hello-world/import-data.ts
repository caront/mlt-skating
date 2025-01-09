import { createClient } from "https://deno.land/x/supabase/mod.ts";
import { parse } from "https://deno.land/x/xml/mod.ts";

// Supabase configuration
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_KEY = Deno.env.get("SUPABASE_KEY");
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing Supabase credentials in environment variables.");
  Deno.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Montreal Open Data API URL
const DATA_URL =
  "https://donnees.montreal.ca/dataset/patinoires/resource/5b1244bd-7b92-436b-8a84-2fab1ea802a4/proxy";

// Function to fetch XML data and parse it into JSON
async function fetchXMLData(url: string): Promise<any> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  const text = await response.text();
  return parse(text);
}

// Function to fetch GPS coordinates using Google Maps API
async function getCoordinates(
  address: string
): Promise<{ lat: number; lng: number } | null> {
  const GOOGLE_MAPS_API_KEY = Deno.env.get("GOOGLE_MAPS_API_KEY");
  if (!GOOGLE_MAPS_API_KEY) {
    throw new Error("Missing Google Maps API key in environment variables.");
  }

  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${GOOGLE_MAPS_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.status === "OK") {
    const location = data.results[0].geometry.location;
    return { lat: location.lat, lng: location.lng };
  } else {
    console.error(`Error fetching coordinates for ${address}: ${data.status}`);
    return null;
  }
}

// Function to process and update districts in Supabase
async function processDistricts(data: any) {
  const districts = data.patinoires.patinoire.map((rink: any) => {
    const district = rink.arrondissement;
    return {
      code: district.cle,
      name: district.nom_arr,
    };
  });

  for (const district of districts) {
    console.log(`Processing district: ${district.name}`);
    const gps = await getCoordinates(`${district.name}, Montreal, QC`);

    const { data, error } = await supabase
      .from("districts")
      .upsert({
        district_code: district.code,
        district_name: district.name,
        latitude: gps?.lat,
        longitude: gps?.lng,
      })
      .select();

    if (error) {
      console.error(`Error updating district ${district.name}:`, error.message);
    } else {
      console.log(`District updated: ${district.name}`);
    }
  }
}

// Function to process and update rinks in Supabase
async function processRinks(data: any) {
  const rinks = data.patinoires.patinoire;

  for (const rink of rinks) {
    const rinkData = {
      district_code: rink.arrondissement.cle,
      name: rink.nom,
      description: rink.description || null,
      type: rink.type || null,
      rink_name: rink.nom,
    };

    console.log(`Processing rink: ${rinkData.name}`);
    const gps = await getCoordinates(`${rinkData.name}, Montreal, QC`);

    const district = await supabase
      .from("districts")
      .select("id")
      .eq("district_code", rinkData.district_code)
      .single();

    if (!district.data) {
      console.error(`District not found for rink: ${rinkData.name}`);
      continue;
    }

    const { data, error } = await supabase
      .from("rinks")
      .upsert({
        district_id: district.data.id,
        name: rinkData.name,
        description: rinkData.description,
        type: rinkData.type,
        rink_name: rinkData.rink_name,
        coordinates: gps ? `POINT(${gps.lng} ${gps.lat})` : null,
      })
      .select();

    if (error) {
      console.error(`Error updating rink ${rinkData.name}:`, error.message);
    } else {
      console.log(`Rink updated: ${rinkData.name}`);
    }
  }
}

// Main function to orchestrate the processing
async function main() {
  console.log("Fetching data from Montreal Open Data API...");
  const data = await fetchXMLData(DATA_URL);

  console.log("Processing districts...");
  await processDistricts(data);

  console.log("Processing rinks...");
  await processRinks(data);

  console.log("Data processing completed.");
}

await main();
