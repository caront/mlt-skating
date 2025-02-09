import { createClient } from "jsr:@supabase/supabase-js@2";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_KEY = Deno.env.get("SUPABASE_KEY");
const GOOGLE_TRANSLATE_API_KEY = Deno.env.get("GOOGLE_TRANSLATE_API_KEY");

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("❌ Missing Supabase credentials in environment variables.");
  Deno.exit(1);
}

if (!GOOGLE_TRANSLATE_API_KEY) {
  console.error(
    "❌ Missing GOOGLE_TRANSLATE_API_KEY in environment variables."
  );
  Deno.exit(1);
}

const TRANSLATE_API_URL = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`;

async function translateText(text: string, targetLang = "en"): Promise<string> {
  if (!text) return ""; // Return empty if text is null
  const response = await fetch(TRANSLATE_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: text,
      target: targetLang,
      format: "text",
    }),
  });

  const data = await response.json();
  return data.data?.translations[0]?.translatedText || text; // Return original text if translation fails
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

enum RinkService {
  PICKLEBALL = "PICKLEBALL",
  FREE_PARKING = "FREE_PARKING",
  FAMILY_CHANGING_ROOM = "FAMILY_CHANGING_ROOM",
  PLAYGROUND_KIDS = "PLAYGROUND_KIDS",
  PLAYGROUND_TODDLERS = "PLAYGROUND_TODDLERS",
  TOILETS = "TOILETS",
  HEATED_CHALET = "HEATED_CHALET",
  BIKE_RACK = "BIKE_RACK",
  CHANGING_TABLE = "CHANGING_TABLE",
  DRINKING_FOUNTAIN = "DRINKING_FOUNTAIN",
  CHANGING_ROOM = "CHANGING_ROOM",
  PAID_PARKING = "PAID_PARKING",
  FREE_WIFI = "FREE_WIFI",
  SNACK_BAR = "SNACK_BAR",
}

const RINK_SERVICE_FR: Record<RinkService, string> = {
  [RinkService.PICKLEBALL]: "Terrain de pickleball",
  [RinkService.FREE_PARKING]: "Stationnement gratuit",
  [RinkService.FAMILY_CHANGING_ROOM]: "Vestiaire familial",
  [RinkService.PLAYGROUND_KIDS]: "Module de jeu pour enfants",
  [RinkService.PLAYGROUND_TODDLERS]: "Module de jeu pour tout-petits",
  [RinkService.TOILETS]: "Toilettes",
  [RinkService.HEATED_CHALET]: "Roulotte ou chalet chauffé",
  [RinkService.BIKE_RACK]: "Support à vélo",
  [RinkService.CHANGING_TABLE]: "Table à langer",
  [RinkService.DRINKING_FOUNTAIN]: "Fontaine d'eau potable",
  [RinkService.CHANGING_ROOM]: "Vestiaire",
  [RinkService.PAID_PARKING]: "Stationnement ($)",
  [RinkService.FREE_WIFI]: "Wi-Fi gratuit",
  [RinkService.SNACK_BAR]: "Casse-croûte",
};

const RINK_SERVICE_FR_REVERSE: Record<string, RinkService> = Object.fromEntries(
  Object.entries(RINK_SERVICE_FR).map(([key, value]) => [
    value,
    key as RinkService,
  ])
);

async function translateDescription(
  rink: any
): Promise<{ fr: string; en: string }> {
  const fr = rink.description;
  const en = await translateText(fr);
  return { fr, en };
}

async function translateName(rink: any): Promise<{ fr: string; en: string }> {
  const fr = rink.name;
  const en = rink.name;
  return { fr, en };
}

async function translateInformation(
  rink: any
): Promise<{ fr: string; en: string }> {
  const fr = rink.description;
  const en = await translateText(fr);
  return { fr, en };
}

async function updateRinkDetails(rinkId: number, rinkGroupId: number) {
  const { data: rinkGroupData, error } = await supabase
    .from("rink_groups")
    .select("*")
    .eq("id", rinkGroupId);
  if (error) {
    console.error("Error fetching rink group:", error);
  }

  const { data: rinkData, error: rinkFetchError } = await supabase
    .from("rinks")
    .select("*")
    .eq("id", rinkId);
  if (rinkFetchError) {
    console.error("Error fetching rink:", error);
  }

  if (rinkGroupData && rinkData) {
    const rinkGroup = rinkGroupData[0];
    const rink = rinkData[0];
    console.log(`Updating rink ${rinkId} with rink group ${rinkGroup.name}`);

    const { fr: description_fr, en: description_en } =
      await translateDescription(rink);

    const { fr: name_fr, en: name_en } = await translateName(rinkGroup);

    const { fr: information_fr, en: information_en } =
      await translateInformation(rinkGroup);

    const { error } = await supabase
      .from("rinks")
      .update({
        name: rinkGroup.name,
        longitude: rinkGroup.longitude,
        latitude: rinkGroup.latitude,
        schedules: rinkGroup.hours,
        services: rinkGroup.services.map(
          (service: string) => RINK_SERVICE_FR_REVERSE[service]
        ),
        information: rinkGroup.description,
        address: rinkGroup.address,
        description_fr,
        description_en,
        name_fr,
        name_en,
        information_fr,
        information_en,
      })
      .eq("id", rinkId);
    if (error) {
      console.error("Error updating rink:", error);
    }
  }
}

// async function linkRinkAndRinkGroupByFile() {
//   const raw = await Deno.readTextFile("./save/rinks_maping_2.json");
//   const rinks = JSON.parse(raw);

//   for (const rink of rinks.rinks) {
//     const { id, groups } = rink;
//     console.log(`Linking rink ${id} to groups ${groups.map((g: any) => g.id)}`);
//     if (groups.length > 0) {
//       await updateRinkDetails(id, groups[0].id);
//     }
//   }
// }

async function linkRinkAndRinkGroupByFile() {
  // const raw = await Deno.readTextFile("./save/rinks_maping_1.json");
  // const rinks = JSON.parse(raw);

  const { data: rinkLinks, error } = await supabase
    .from("rink_group_rink")
    .select("*");
  if (error) {
    console.error("Error fetching rink group:", error);
  }
  if (!rinkLinks) {
    console.error("No rinks found");
    return;
  }

  for (const rink of rinkLinks) {
    const { rink_id: id, rink_group_id: group } = rink;
    console.log(`Linking rink ${id} to group ${group}`);
    await updateRinkDetails(id, group);
  }
}

linkRinkAndRinkGroupByFile();
