import { parse } from "https://deno.land/x/xml/mod.ts";
import DayJs from "npm:dayjs@1.11.13";
import supabase from "../supabase.ts";
import {
  RinkCondition,
  CONDITIONS,
  ECondition,
  getRinkLastCondition,
} from "./utils.ts";

const DATA_URL =
  "https://donnees.montreal.ca/dataset/patinoires/resource/5b1244bd-7b92-436b-8a84-2fab1ea802a4/proxy";

type RinkOpenData = {
  nom: string;
  arrondissement: {
    date_maj: string;
  };
  ouvert: string | null;
  deblaye: string | null;
  arrose: string | null;
  resurface: string | null;
  condition: string;
};

// Function to fetch XML data and parse it into JSON
async function fetchXMLData(url: string): Promise<any> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  const text = await response.text();
  return parse(text);
}
let cachedRinks: RinkOpenData[] | null = null;

const fetchRinksFromOD = async () => {
  if (cachedRinks) {
    return cachedRinks;
  }
  const data = await fetchXMLData(DATA_URL);
  cachedRinks = data.patinoires.patinoire;
  return cachedRinks;
};

// deno-lint-ignore no-explicit-any
const syncData = async (rinkId: string, rinkUpdateParam: any) => {
  const { rink_name } = rinkUpdateParam;
  const odRinks = await fetchRinksFromOD();
  if (!odRinks) {
    throw new Error("No rinks found");
  }

  const odRink = odRinks.find((r: RinkOpenData) => r.nom === rink_name);

  if (!odRink) {
    throw new Error(`Open data rink not found: ${rinkId}`);
  }

  const rinkConditionCreatedTime = DayJs(odRink.arrondissement.date_maj);
  const rinkCondition: RinkCondition = {
    updated_at: rinkConditionCreatedTime.toISOString(),
    open: odRink.ouvert === "1",
    cleared: odRink.deblaye === "1",
    watered: odRink.arrose === "1",
    resurfaced: odRink.resurface === "1",
    condition:
      odRink.condition && odRink.condition in CONDITIONS
        ? CONDITIONS[odRink.condition as keyof typeof CONDITIONS]
        : ECondition.NA,
  };

  const lastRinkCondition = await getRinkLastCondition(rinkId);

  const hasToInsertNewConditions =
    !lastRinkCondition ||
    rinkConditionCreatedTime.isAfter(DayJs(lastRinkCondition.updated_at));

  if (hasToInsertNewConditions) {
    const { data: newCondition, error: newConditionError } = await supabase
      .from("conditions")
      .insert([
        {
          ...rinkCondition,
          rink_id: rinkId,
        },
      ])
      .select("*");

    if (newConditionError) {
      throw new Error(`Error inserting new condition ${newConditionError} `);
    }
    console.log("New condition inserted", newCondition);
  }
};

export default syncData;
