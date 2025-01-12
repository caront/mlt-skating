import { createClient } from "jsr:@supabase/supabase-js@2";
import { parse } from "https://deno.land/x/xml/mod.ts";

// Supabase configuration
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_KEY = Deno.env.get("SUPABASE_KEY");
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing Supabase credentials in environment variables.");
  Deno.exit(1);
}

const UPDATE_GPS = true;

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

async function processDistrict(district: any) {
  console.log(`Processing district: ${district.name}`);

  const { data: districtOnDb } = await supabase
    .from("districts")
    .select("id")
    .eq("code", district.code)
    .single();

  if (districtOnDb) {
    console.log(`District already exists: ${district.name}`);
  } else {
    console.log(`District does not exist: ${district.name}`);
    const gps = await getCoordinates(`${district.name}, Montreal, QC`);
    if (!gps) {
      console.error(`Error fetching coordinates for ${district.name}`);
    }
    const { error } = await supabase
      .from("districts")
      .insert({
        code: district.code,
        name: district.name,
        latitude: gps?.lat,
        longitude: gps?.lng,
      })
      .select();
    if (error) {
      console.error(
        `Error inserting district ${district.name}:`,
        error.message
      );
    } else {
      console.log(`District inserted: ${district.name}`);
    }
  }
}

// Function to process and update districts in Supabase
async function processDistricts(data: any) {
  const districts = data.patinoires.patinoire.reduce((acc: any, rink: any) => {
    const district = rink.arrondissement;
    if (!district.cle && district.cle in acc) return acc;
    acc[district.cle] = { name: district.nom_arr, code: district.cle };
    return acc;
  }, {});

  for (const districtCle in districts) {
    const district = districts[districtCle];

    console.log(`Processing district: ${districtCle} - ${district.name}`);

    await processDistrict(district);
  }
}

const CONDITIONS = {
  Excellente: "EXCELLENTE",
  Bonne: "GOOD",
  Mauvaise: "BAD",
  "N/A": "NA",
};

interface Rink {
  arrondissement: { cle: string };
  nom: string;
  description?: string;
  type?: string;
  ouvert: string;
  debacle: string;
  arrose: string;
  resurfa: string;
  condition: keyof typeof CONDITIONS;
}

function splitRinkString(rinkString: string) {
  const regex = /^(.*?),\s*(.*?)\s*\((.*?)\)$/;
  const match = rinkString.match(regex);

  if (!match) {
    throw new Error("String format is incorrect");
  }

  const [, description, name, type] = match;
  return { description, name, type };
}

async function processRink(rink: Rink) {
  const { description, name, type } = splitRinkString(rink.nom);

  const rinkData = {
    code: rink.arrondissement.cle,
    name,
    description,
    type,
    rink_name: rink.nom,
  };

  const conditions = {
    open: rink.ouvert === "1",
    cleared: rink.debacle === "1",
    watered: rink.arrose === "1",
    resurfaced: rink.resurfa === "1",
    condition:
      rink.condition && rink.condition in CONDITIONS
        ? CONDITIONS[rink.condition]
        : null,
  };

  console.log(`Processing rink: ${rinkData.name}`);

  let rinkId = null;

  const { data: existingRinkData, error: errorExistingRinkData } =
    await supabase
      .from("rinks")
      .select("id")
      .eq("rink_name", rink.nom)
      .single();
  if (errorExistingRinkData) {
    console.error(
      `Error fetching existing rink data for ${rinkData.name}:`,
      errorExistingRinkData.message
    );
  }

  const district = await supabase
    .from("districts")
    .select("*")
    .eq("code", rinkData.code)
    .single();

  if (!district.data) {
    console.error(`District not found for rink: ${rinkData.name}`);
    return;
  }

  if (existingRinkData) {
    console.log(`Rink already exists: ${rinkData.name}`);
    rinkId = existingRinkData.id;

    if (UPDATE_GPS) {
      const gps = await getCoordinates(`patinoire ${rinkData.name}, ${district?.data?.name}, Montreal, QC`);
      const { error: errorUpdateRink } = await supabase
        .from("rinks")
        .update({
          latitude: gps?.lat,
          longitude: gps?.lng,
        })
        .eq("id", rinkId);
      if (errorUpdateRink) {
        console.error(
          `Error updating rink ${rinkData.name}:`,
          errorUpdateRink.message
        );
      }
    }
  } else {
    const district = await supabase
      .from("districts")
      .select("id")
      .eq("code", rinkData.code)
      .single();

    if (!district.data) {
      console.error(`District not found for rink: ${rinkData.name}`);
      return;
    }

    const gps = await getCoordinates(`${rinkData.name}, Montreal, QC`);
    const { data: newRinkData, error: errorRinkInsert } = await supabase
      .from("rinks")
      .insert({
        district_id: district?.data?.id,
        name: rinkData.name,
        description: rinkData.description,
        type: rinkData.type,
        rink_name: rinkData.rink_name,
        latitude: gps?.lat,
        longitude: gps?.lng,
      })
      .select();
    if (errorRinkInsert) {
      console.error(
        `Error inserting rink ${rinkData.name}:`,
        errorRinkInsert.message
      );
    }
    if (!newRinkData) {
      console.error(`Error inserting rink ${rinkData.name}`);
      return;
    }

    rinkId = newRinkData[0].id;
    console.log(`Rink inserted: ${rinkData.name}`);
  }
  const { error: errorConditionInsert } = await supabase
    .from("conditions")
    .insert({
      rink_id: rinkId,
      open: conditions.open,
      cleared: conditions.cleared,
      watered: conditions.watered,
      resurfaced: conditions.resurfaced,
      condition: conditions.condition,
    })
    .select();

  if (errorConditionInsert) {
    console.error(
      `Error inserting conditions for rink ${rinkData.name}:`,
      errorConditionInsert.message
    );
  }

  console.log("Conditions inserted for rink:", rinkData.name);
}

// Function to process and update rinks in Supabase
async function processRinks(data: any) {
  const rinks = data.patinoires.patinoire;

  await Promise.all(rinks.map(processRink));
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
