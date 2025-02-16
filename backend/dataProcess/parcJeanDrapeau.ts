import DayJs from "npm:dayjs@1.11.13";
import { ECondition, RinkCondition } from "./utils.ts";
import axiod from "https://deno.land/x/axiod/mod.ts";

const DATA_URL =
  "https://www.parcjeandrapeau.com/fr/sentier-des-patineurs-patinoire-patin-glace-activite-hiver-montreal";
const fetchJeanDrapeauPage = async (
  retries = 1
): Promise<Document | null | undefined> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const pageResponse = await axiod.get(DATA_URL, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
        },
      });
      console.log(pageResponse);
      const content = await pageResponse.data;

      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      return doc;
    } catch (error) {
      if (attempt === retries) {
        throw error;
      }
      console.warn(`Attempt ${attempt} failed. Retrying...`);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
    }
  }
  return null;
};

const getRinkInfo = (doc: Document, rinkName: string) => {
  const rinkHeader = Array.from(doc.querySelectorAll("h4")).find(
    (h4) => h4.textContent && h4.textContent.includes(rinkName)
  );
  if (!rinkHeader) return null;
  const table = rinkHeader.nextElementSibling;
  if (!table) return null;
  const openStatusElement = table.querySelector("th span");
  const conditionElement = table.querySelector("tr:nth-child(2) td span");
  const entretienElement = table.querySelector("tr:nth-child(3) td span");
  if (!openStatusElement || !conditionElement || !entretienElement) return null;
  const openStatus = openStatusElement.textContent
    ? openStatusElement.textContent.trim()
    : "";
  const condition = conditionElement.textContent
    ? conditionElement.textContent.trim()
    : "";
  const entretien = entretienElement.textContent
    ? entretienElement.textContent.trim()
    : "";

  const lastUpdateElement = rinkHeader.nextElementSibling.nextElementSibling;
  const lastUpdate =
    lastUpdateElement && lastUpdateElement.textContent
      ? lastUpdateElement.textContent.trim()
      : null;

  return { openStatus, condition, entretien, lastUpdate };
};

async function fetchRinkConditionFromPage(
  rinkName: string
): Promise<RinkCondition> {
  const doc = await fetchJeanDrapeauPage();
  if (!doc) {
    throw new Error("Failed to fetch the page document");
  }
  const rinkInfo = getRinkInfo(doc, rinkName);
  if (!rinkInfo) {
    throw new Error(`Rink info for ${rinkName} not found`);
  }
  const { openStatus, condition, entretien, lastUpdate } = rinkInfo;

  console.log("Rink info", { openStatus, condition, entretien, lastUpdate });

  return {
    updated_at: DayJs().toISOString(),
    open: true,
    cleared: entretien === "Oui",
    watered: true,
    resurfaced: true,
    condition: ECondition.NA,
  };
}

// deno-lint-ignore no-explicit-any
const syncData = async (_rinkId: string, _rinkUpdateParam: any) => {
//   const condition = await fetchRinkConditionFromPage(rinkUpdateParam.rink_name);
  //   const lastRinkCondition = await getRinkLastCondition(rinkId);
  //   const hasToInsertNewConditions =
  //     !lastRinkCondition ||
  //     rinkConditionCreatedTime.isAfter(DayJs(lastRinkCondition.updated_at));
  //   if (hasToInsertNewConditions) {
  //     const { data: newCondition, error: newConditionError } = await supabase
  //       .from("conditions")
  //       .insert([
  //         {
  //           ...rinkCondition,
  //           rink_id: rinkId,
  //         },
  //       ]).select('*');
  //     if (newConditionError) {
  //       throw new Error("Error inserting new condition");
  //     }
  //     console.log("New condition inserted", newCondition);
  //   }
};

export default syncData;
