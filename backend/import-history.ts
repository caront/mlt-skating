import { createClient } from "jsr:@supabase/supabase-js@2";
import { parse } from "https://deno.land/x/xml/mod.ts";
import DayJs from "npm:dayjs@1.11.13";

// Supabase configuration
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_KEY = Deno.env.get("SUPABASE_KEY");
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing Supabase credentials in environment variables.");
  Deno.exit(1);
}
interface Rink {
  id: number;
  rink_name: string;
  district_id: number;
  district_name: string;
}
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const districts: { [key: number]: string } = {};

const rinksFailed: Rink[] = [];

const MONTRAL_OPEN_DATA_API_URL =
  "https://donnees.montreal.ca/api/3/action/datastore_search_sql";

const fetchDistricts = async () => {
  const { data, error } = await supabase.from("districts").select("*");
  if (error) {
    console.error("Error fetching districts:", error.message);
    return;
  }
  data.forEach((district: any) => {
    districts[district.id] = district.name;
  });
};

const fetchRinksOnDB = async (): Promise<Rink[]> => {
  const { data: rinks, error } = await supabase
    .from("rinks")
    .select(`name, id, district_id`);
  if (error) {
    console.error("Error fetching rinks:", error.message);
    return [];
  }

  return rinks.map(
    (rink: any): Rink => ({
      id: rink.id,
      rink_name: rink.name,
      district_id: rink.district_id,
      district_name: districts[rink.district_id],
    })
  );
};

const queryBuilder = (rink: Rink) => {
  const query = `SELECT * from "f1381e6d-07c2-4731-ae21-30f099403294" where "DATE_TRS" > '${DayJs()
    .subtract(2, "week")
    .format("YYYY-MM-DD")}' AND "PATINOIRE" ILIKE '%${rink.rink_name}%'
     AND "ARRONDISSEMENT" ILIKE '%${
       rink.district_id === 41
         ? "Île-Bizard - Sainte-Geneviève"
         : rink.district_name
     }%' ORDER BY "DATE_TRS" DESC`;
  return query;
};

const fetchRinkHistory = async (rink: Rink) => {
  console.log(`Fetching history for rink: #${rink.id} ${rink.rink_name}`);
  try {
    const query = queryBuilder(rink);
    const encodedQuery = `sql=${query}`;
    const url = MONTRAL_OPEN_DATA_API_URL + "?" + encodedQuery;
    console.log(url);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    // data.result.records.map((record: any) => {
    //   console.log(record);
    // });
    await Promise.all(
      data.result.records.map(async (record: any) => {
        console.log(record);
        const data = {
          rink_id: rink.id,
          updated_at: record.DATE_TRS,
          open: record.OUVERT === "1",
          cleared: record.DEBLAYE === "1",
          watered: record.ARROSE === "1",
          resurfaced: record.RESURFACE === "1",
          condition: record.CONDITION_PATINOIRE || "NA",
        };
        console.log(data);

        const { error } = await supabase.from("conditions").insert([data]);
        if (error) {
          console.error("Error inserting rink history:", error.message);
        }
        console.log("Rink history inserted for rink:", rink.rink_name);
      })
    );
  } catch (ex) {
    console.error(ex);
    // rinksFailed.push(rink);
  }
};

async function main() {
  await fetchDistricts();
  const rinks = await fetchRinksOnDB();
  //   console.log(rinks);
  for (const rink of rinks) {
    await fetchRinkHistory(rink);
  }

  console.log("Rinks failed to fetch history:", rinksFailed);
}

await main();
