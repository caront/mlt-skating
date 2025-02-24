import DayJs from "https://esm.sh/dayjs@1.11.10";
import customParseFormat from "https://esm.sh/dayjs@1.11.10/plugin/customParseFormat.js";
import {
  RinkCondition,
  CONDITIONS,
  ECondition,
  getRinkLastCondition,
} from "./utils.ts";
import {
  DOMParser,
  HTMLDocument,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import supabase from "../supabase.ts";

DayJs.extend(customParseFormat);

async function fetchWithCurl() {
  const command = new Deno.Command("curl", {
    args: [
      "-s", // Silent mode: no progress bar
      "-A",
      "Mozilla/5.0", // User-Agent to mimic a browser
      "https://www.parcjeandrapeau.com/en/skaters-trail-skating-rink-ice-skate-activity-winter-montreal/",
    ],
    stdout: "piped",
    stderr: "piped",
  });

  const { stdout, stderr } = await command.output();

  if (stderr.length) {
    throw new Error("Curl Error: " + new TextDecoder().decode(stderr));
  }
  return new TextDecoder().decode(stdout);
}

async function fetchJeanDrapeauPage(): Promise<HTMLDocument | null> {
  try {
    const response = await fetchWithCurl();
    return new DOMParser().parseFromString(response, "text/html");
  } catch (error) {
    console.error("Fetch Error:", error);
  }
  return null;
}
const getRinkInfo = (doc: HTMLDocument, rinkName: string) => {
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

  const parsedLastUpdate = lastUpdate ? parseLastUpdate(lastUpdate) : DayJs();
  return {
    open: openStatus === "Opened",
    condition:
      condition in CONDITIONS
        ? CONDITIONS[condition as keyof typeof CONDITIONS]
        : ECondition.NA,
    entretien: entretien === "Resurfaced",
    lastUpdate: parsedLastUpdate,
  };
};

const parseLastUpdate = (lastUpdate: string) => {
  const format = "[Updated on] MMMM D, YYYY [at] h:mm A.";

  const parsed = DayJs(lastUpdate, format, "en", false);
  return parsed;
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
  const { open, condition, entretien, lastUpdate } = rinkInfo;


  return {
    updated_at: lastUpdate.toISOString(),
    open,
    cleared: entretien,
    watered: entretien,
    resurfaced: entretien,
    condition,
  };
}

// deno-lint-ignore no-explicit-any
const syncData = async (rinkId: string, rinkUpdateParam: any) => {
  const condition = await fetchRinkConditionFromPage(rinkUpdateParam.rink_name);
  const lastRinkCondition = await getRinkLastCondition(rinkId);

  const rinkConditionCreatedTime = DayJs(condition.updated_at);
    const hasToInsertNewConditions =
      !lastRinkCondition ||
      rinkConditionCreatedTime.isAfter(DayJs(lastRinkCondition.updated_at));
    if (hasToInsertNewConditions) {
      const { data: newCondition, error: newConditionError } = await supabase
        .from("conditions")
        .insert([
          {
            ...condition,
            rink_id: rinkId,
          },
        ]).select('*');
      if (newConditionError) {
        throw newConditionError;
      }
      console.log("New condition inserted", newCondition);
    }
};

export default syncData;
