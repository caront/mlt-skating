import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_KEY = Deno.env.get("SUPABASE_KEY");
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing Supabase credentials in environment variables.");
  Deno.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const districts: { [key: string]: number } = {
  "Côte-des-Neiges–Notre-Dame-de-Grâce": 39,
  "Saint-Léonard": 40,
  "L'Île-Bizard–Sainte-Geneviève": 41,
  Anjou: 42,
  "Le Plateau-Mont-Royal": 43,
  Outremont: 44,
  Lachine: 45,
  "Mercier–Hochelaga-Maisonneuve": 46,
  Verdun: 47,
  "Pierrefonds-Roxboro": 48,
  "Villeray–Saint-Michel–Parc-Extension": 49,
  "Montréal-Nord": 50,
  "Rosemont–La Petite-Patrie": 51,
  "Ahuntsic-Cartierville": 52,
  "Le Sud-Ouest": 53,
  "Rivière-des-Prairies–Pointe-aux-Trembles": 54,
  "Ville-Marie": 55,
  "Saint-Laurent": 56,
  LaSalle: 57,
  "Ile St-hélène": 58,
};

// Define the target URL
const MONTREAL_RINKS_URL =
  "https://montreal.ca/lieux?mtl_content.lieux.installation.code=ANGR%2CPATI&page=";
let rinkFound = 0;
let rinkInDB = 0;

function removeHtmlElements(htmlString: string): string {
  return htmlString.replace(/<[^>]*>/g, "");
}

async function fetchRinkDetails(rinkLink: string) {
  try {
    const response = await fetch(rinkLink);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch the rink details. Status: ${response.status}`
      );
    }

    const html = await response.text();

    const doc = new DOMParser().parseFromString(html, "text/html");

    if (!doc) {
      throw new Error("Failed to parse the HTML document.");
    }
    const scriptElement = doc.querySelector(
      'script[type="application/ld+json"]'
    );
    if (!scriptElement) {
      throw new Error("Failed to find the JSON-LD script element.");
    }
    const jsonld = JSON.parse(scriptElement.innerText);
    const servicesElement = doc.getElementById("commodites");

    const services: string[] = [];
    servicesElement?.querySelectorAll("li")?.forEach((li) => {
      services.push(li.textContent);
    });
    const {
      geo: { latitude, longitude },
      address,
      description,
      openingHoursSpecification,
    } = jsonld;

    return {
      description: removeHtmlElements(description),
      latitude,
      longitude,
      address,
      hours: openingHoursSpecification,
      services,
    };
  } catch (ex) {
    console.error("Error fetching rink details:", ex);
  }
  return {};
}
async function fetchRinks() {
  try {
    const rinks: any[] = [];
    // Fetch the page HTML
    const fetchPage = async (page: number) => {
      const response = await fetch(`${MONTREAL_RINKS_URL}${page}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch the page. Status: ${response.status}`);
      }

      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      if (!doc) {
        throw new Error("Failed to parse the HTML document.");
      }
      const rinkElements = doc.querySelectorAll(
        ".list-group-item.list-element.p-0"
      ); // Update selector based on site structure

      for (let i = 0; i < rinkElements.length; i++) {
        const rinkElement = rinkElements[i];

        const rinkName =
          rinkElement
            .querySelector(".list-group-item-title")
            ?.textContent?.trim() || "Unknown Rink";

        const addressElements = rinkElement.querySelectorAll(
          ".list-group-info-item"
        );
        console.log(
          `Processing rink ${rinkName} page ${page} idx ${i + 1}/${
            rinkElements.length
          }`
        );
        const districtName: string = addressElements[1].textContent.trim();

        const link = rinkElement.querySelector("a")?.getAttribute("href") || "";

        //replace patinoire, patinoires, anneau de glace, with empty string
        const searchName = rinkName
          .replace(
            /patinoires|patinoire|pavillon|anneau de glace|réfrigérée|du|parc|de sports d'équipe|petite/gi,
            ""
          )
          .replace(/-+/g, "%")
          .replace(/ +/g, "%")
          .trim()
          .toLowerCase();
        const district = districts[districtName] || 0;
        const { data: existingRink, error: fetchRinkError } = await supabase
          .from("rinks")
          .select("*")
          .eq("district_id", district)
          .ilike("name", `%${searchName}%`);
        if (fetchRinkError) {
          console.error("Error fetching existing rink:", fetchRinkError);
        }
        rinkFound++;
        rinkInDB += existingRink ? existingRink.length : 0;

        const rinkDetails = await fetchRinkDetails(
          `https://montreal.ca${link}`
        );
        const rink = {
          ids: existingRink ? existingRink.map((rink: any) => rink.id) : [],
          db_rinks: existingRink
            ? existingRink.map(({ id, name }) => {
                return { id, name };
              })
            : [],
          rink_name: rinkName,
          searchName,
          district,
          districtName,
          link: `https://montreal.ca${link}`, // Append domain to relative URLs
          ...rinkDetails,
        };
        // console.log(rink);
        rinks.push(rink);
      }
      return rinkElements.length;
    };

    for (let page = 1; page <= 3; page++) {
      const rinksFetched = await fetchPage(page);
      if (rinksFetched !== 100) {
        break;
      }
    }
    await Deno.writeTextFile("rinks.json", JSON.stringify(rinks, null, 2));

    const rinkGroupUpsert = async (rink: any) => {
      const { data: rinkGroupData, error } = await supabase
        .from("rink_groups")
        .select("id")
        .eq("name", rink.rink_name);
      if (error) {
        console.error("Error fetching rink group:", error);
      }
      if (rinkGroupData && rinkGroupData.length > 0) {
        const rinkGroupId = rinkGroupData[0].id;
        const { error } = await supabase
          .from("rink_groups")
          .update({
            link: rink.link,
            latitude: rink.latitude,
            longitude: rink.longitude,
            address: rink.address,
            services: rink.services,
            hours: rink.hours,
            description: rink.description,
          })
          .eq("id", rinkGroupId);
        if (error) {
          console.error("Error updated rink group:", error);
        }
        // return data[0].id;
      } else {
        const { error } = await supabase.from("rink_groups").insert({
          name: rink.rink_name,
          district_id: rink.district,
          link: rink.link,
          latitude: rink.latitude,
          longitude: rink.longitude,
          address: rink.address,
          services: rink.services,
          hours: rink.hours,
          description: rink.description,
        });
        if (error) {
          console.error("Error inserting rink group:", error, rink);
        }
        // return data[0].id;
      }
    };

    await Promise.all(rinks.map(rinkGroupUpsert));
    // await Promise.all(
    //   rinks.map((rink) => {
    //     const {
    //       rink_name,
    //       district,
    //       link,
    //       latitude,
    //       longitude,
    //       address,
    //       services,
    //       hours,
    //       description,
    //     } = rink;
    //     return supabase.from("rink_groups").insert({
    //       name: rink_name,
    //       district_id: district,
    //       link,
    //       latitude,
    //       longitude,
    //       address,
    //       services,
    //       hours,
    //       description
    //     });
    //   })
    // );

    console.log({ rinkFound, rinkInDB });
  } catch (error) {
    console.error("Error fetching rinks:", error);
  }
}

// Run the function
// fetchRinks();

const disctiminationFilter = (
  rink: { name: string },
  rinkGroup: { name: string }
) => {
  const searchName = searchTerm(rinkGroup);
  return searchTerm(rink).includes(searchName);
};

const searchTerm = (rink: any) => {
  return rink.name
    .replace(/du|parc|de|d\'/gi, "")
    .replace(/-+/g, " ")
    .replace(/  +/g, " ")
    .replace(/É+/g, "E")
    .trim()
    .toUpperCase();
};

async function linkRinkAndRinkGroup() {
  try {
    const rinks: {
      [key: string]: {
        searchterm: string;
        groups: { id: number; name: string }[];
        existingGroups: { id: number; name: string }[];
        id: number;
        name: string;
        rink_name: string;
      };
    } = {};
    const { data: rinksData, error } = await supabase.from("rinks").select("*");

    if (error || !rinksData) {
      console.error("Error fetching rink", error);
    }
    if (rinksData) {
      for (const rinkData of rinksData) {
        rinks[rinkData.id] = {
          groups: [],
          searchterm: searchTerm(rinkData),
          existingGroups: [],
          id: rinkData.id,
          name: rinkData.name,
          rink_name: rinkData.rink_name,
        };
        const { data: existingRink, error: fetchRinkError } = await supabase
          .from("rink_groups")
          .select("*")
          .eq("district_id", rinkData.district_id);
        //   .ilike("name", `%${searchName}%`);

        if (fetchRinkError) {
          console.error("Error fetching existing rink:", fetchRinkError);
        }
        if (existingRink && existingRink.length > 0) {
          const linkedRink = existingRink.filter((r) =>
            disctiminationFilter(r, rinkData)
          );

          rinks[rinkData.id].existingGroups = existingRink.map(
            ({ id, name }) => {
              return { id, name };
            }
          );
          rinks[rinkData.id].groups = linkedRink.map(({ id, name }) => {
            return { id, name };
          });
          // console.log(
          //   `Linking rink group ${rinkGroup.name} to rink ${linkedRink
          //     .map((r) => r.name)
          //     .join(", ")}`
          // );

          // await Promise.all(linkedRink.map((r) => {
          //   return supabase
          //     .from("rink_group_rink")
          //     .insert({ rink_group_id: rinkGroup.id, rink_id: r.id })
          // }));
        }
      }
    }

    const notFound = Object.values(rinks).filter(
      (rink) => rink.groups.length === 0
    );

    const multple = Object.values(rinks).filter(
      (rink) => rink.groups.length > 1
    );

    const single = Object.values(rinks).filter(
      (rink) => rink.groups.length === 1
    );

    for (const rinkId in rinks) {
      const rink = rinks[rinkId];
      if (rink.groups.length === 0) {
        console.log(`No rink group found for rink ${rink.name}`);
      }
      if (rink.groups.length > 1) {
        console.log(
          `Multiple rink groups found for rink ${rink.name}: ${rink.groups
            .map((r) => r.name)
            .join(", ")}`
        );
      }
    }
    console.log({ notFound: notFound.length, multple: multple.length });
    // await Deno.writeTextFile(
    //   "rinks_result_2.json",
    //   JSON.stringify(
    //     {
    //       notFound,
    //       multple,
    //     },
    //     null,
    //     2
    //   )
    // );

    await Deno.writeTextFile(
      "rinks_maping_2.json",
      JSON.stringify({ single }, null, 2)
    );
  } catch (error) {
    console.error("Error linking rinks and rink groups:", error);
  }
}

// linkRinkAndRinkGroup();

async function updateRinkDetails(rinkId: number, rinkGroupId: number) {
  const { data: rinkGroupData, error } = await supabase
    .from("rink_groups")
    .select("*")
    .eq("id", rinkGroupId);
  if (error) {
    console.error("Error fetching rink group:", error);
  }
  if (rinkGroupData) {
    const rinkGroup = rinkGroupData[0];
    console.log(`Updating rink ${rinkId} with rink group ${rinkGroup.name}`);
    const {error} = await supabase
      .from("rinks")
      .update({
        name: rinkGroup.name,
        longitude: rinkGroup.longitude,
        latitude: rinkGroup.latitude,
        schedules: rinkGroup.hours,
        services: rinkGroup.services,
        information: rinkGroup.description,
        address: rinkGroup.address,
      })
      .eq("id", rinkId);
    if (error) {
      console.error("Error updating rink:", error);
    }
  }
}

async function linkRinkAndRinkGroupByFile() {
  const raw = await Deno.readTextFile("rinks_maping_2.json");
  const rinks = JSON.parse(raw);
  for (const rink of rinks.rinks) {
    const { id, groups } = rink;
    console.log(`Linking rink ${id} to groups ${groups.map((g: any) => g.id)}`);
    if (groups.length > 0) {
      await updateRinkDetails(id, groups[0].id);
    }
  }
}

linkRinkAndRinkGroupByFile();
