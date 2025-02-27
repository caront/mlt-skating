import supabase from "../supabase/functions/supabase.ts";
// supabase() configuration

const GOOGLE_MAPS_API_KEY = Deno.env.get("GOOGLE_MAPS_API_KEY");

const BUCKET_NAME = "static-maps";

interface StaticMap {
  id: number;
  created_at: string;
  cache_key: string;
  public_url: string;
}

async function getStaticMap(
  longitude: number,
  latitude: number
): Promise<StaticMap | null> {
  const params = new URLSearchParams();
  params.set("center", `${latitude},${longitude}`);
  params.set("zoom", "15");
  params.set("size", "300x150");
  params.set("markers", `color:green|${latitude},${longitude}`);

  const cacheKey = `${latitude}-${longitude}`;

  const { data: dbEntry, error: dbError } = await supabase()
    .from("static-map")
    .select("*")
    .eq("cache_key", cacheKey)
    .single();

  if (dbError && dbError.code !== "PGRST116") {
    console.error("Error fetching database entry:", dbError);
    return null;
  }

  if (dbEntry) {
    return dbEntry;
  }

  const { data: existingFile, error: fileCheckError } = await supabase().storage
    .from(BUCKET_NAME)
    .list("", { search: encodeURIComponent(cacheKey) });

  if (fileCheckError) {
    console.error("Error checking storage bucket:", fileCheckError);
  }

  if (existingFile && existingFile.length > 0) {
    const { data: dbEntry, error: dbError } = await supabase()
      .from("static-map")
      .select("*")
      .eq("cache_key", cacheKey)
      .single();

    if (dbError) {
      console.error("Error fetching database entry:", dbError);
      return null;
    }

    if (dbEntry) {
      return dbEntry;
    }
  }

  const googleMapsUrl = `https://maps.googleapis.com/maps/api/staticmap?${params.toString()}&key=${GOOGLE_MAPS_API_KEY}`;
  const googleResponse = await fetch(googleMapsUrl);

  if (!googleResponse.ok) {
    console.error(`Failed to fetch map image: ${googleResponse.statusText}`);
    return null;
  }

  // Get the image buffer
  const imageBuffer = await googleResponse.arrayBuffer();

  // Save the image to the supabase() Storage bucket
  const { data: uploadData, error: uploadError } = await supabase().storage
    .from(BUCKET_NAME)
    .upload(encodeURIComponent(cacheKey), new Uint8Array(imageBuffer), {
      contentType: "image/png",
      cacheControl: "3600",
    });

  console.log("new image uploaded", uploadData);
  if (uploadError) {
    console.error("Error saving image to bucket:", uploadError);
    return null;
  }

  // Generate the public URL for the uploaded file
  const { data: publicUrlData } = supabase().storage
    .from(BUCKET_NAME)
    .getPublicUrl(uploadData.path);

  const publicUrl = publicUrlData?.publicUrl;

  if (!publicUrl) {
    console.error("Error generating public URL for image");
    return null;
  }

  console.log("Public URL:", publicUrl);

  const { data, error: dbInsertError } = await supabase()
    .from("static-map")
    .insert([
      {
        cache_key: cacheKey,
        public_url: publicUrl,
      },
    ])
    .select();

  if (dbInsertError) {
    console.error("Error inserting into database:", dbInsertError);
    return null;
  }

  return data[0];
}

async function updateRinkStaticMap(
  rinkId: number,
  rinkType: "rinks" | "rink_groups"
) {
  try {
    const { data: rinkData, error: rinkError } = await supabase()
      .from(rinkType)
      .select("latitude, longitude")
      .eq("id", rinkId)
      .single();

    if (rinkError) {
      console.error("Error fetching rink data:", rinkError);
      return;
    }

    if (!rinkData) {
      console.error("Rink not found");
      return;
    }

    const { latitude, longitude } = rinkData;
    const staticMap = await getStaticMap(longitude, latitude);

    if (!staticMap) {
      console.error("Error fetching static map");
      return;
    }

    const { error: updateError } = await supabase()
      .from(rinkType)
      .update({
        public_static_map_url: staticMap.public_url,
      })
      .eq("id", rinkId);

    if (updateError) {
      console.error("Error updating rink static map:", updateError);
      return;
    }
    console.log("Static map updated for rink:", rinkId);
    return;
  } catch (error) {
    console.error("Error updating rink static map:", error);
  }
}

export async function updateRinkMaps() {
  const { data: rinks, error } = await supabase().from("rinks").select("id");
  if (error) {
    console.error("Error fetching rinks:", error);
    return;
  }

  if (!rinks) {
    console.log("No rinks to update");
    return;
  }

  console.log(rinks);
  await Promise.all(
    rinks.map((rink: any) => updateRinkStaticMap(rink.id, "rinks"))
  );
}
