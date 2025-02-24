// deno run --allow-net --allow-read --allow-write --allow-env rink_cli.ts
import { Input } from "jsr:@cliffy/prompt@^1.0.0-rc.7";
import { Table } from "jsr:@cliffy/table@^1.0.0-rc.7";
import { Command } from "jsr:@cliffy/command@^1.0.0-rc.7";

import {
  getRinks,
  createRink as insertRink,
  insertUpdatedRink,
  searchRinks,
  toggleRink as toggleRinkInDB,
} from "./supabase/functions/api/rinks/rinkService.ts";
import { Rink, Schedule } from "./supabase/functions/api/rinks/rink.ts";
import { updateRinkMaps } from "./scripts/update-rink-map.ts";
// import { getDistrict } from "./supabase/functions/api/districts/districtService.ts";
// import { District } from "./supabase/functions/api/districts/distirct.ts";

// const rinks: Rink[] = [];

export interface UpdaterImport {
  type: string;
  update_params: object;
}

export interface RinkImport {
  name: string;
  description: string;
  type: string;
  rink_name: string;
  district_id: number;
  latitude: number;
  longitude: number;
  description_en: string;
  information: string;
  information_en: string;
  address: string;
  services: string[];
  schedules: Schedule[];
  updater: UpdaterImport;
}


function displayObject(rink: object) {
  new Table()
    .header(["Key", "Value"])
    .body(
      Object.entries(rink).map(([key, value]) => [
        key,
        value === null
          ? "null"
          : value === undefined
          ? "undefined"
          : typeof value === "object"
          ? JSON.stringify(value)
          : value.toString(),
      ])
    )
    .border()
    .render();
}


async function createRink() {
  const filePath = await Input.prompt("Enter the path to the rink JSON file:");
  const jsonData = await Deno.readTextFile(filePath);
  const rinkImport: RinkImport = JSON.parse(jsonData);

  console.log("\nReview Rink Details:");
  displayObject(rinkImport);
  const isConfirmed = await confirm(`Is new rink "${rinkImport.rink_name}" correct?`);
  if (!isConfirmed) {
    console.log("❌ Rink creation aborted.");
    return;
  }

  const rink = {
    name: rinkImport.name,
    description: rinkImport.description,
    type: rinkImport.type,
    rink_name: rinkImport.rink_name,
    district_id: rinkImport.district_id,
    latitude: rinkImport.latitude,
    longitude: rinkImport.longitude,
    description_en: rinkImport.description_en,
    information: rinkImport.information,
    information_en: rinkImport.information_en,
    address: rinkImport.address,
    services: rinkImport.services,
    schedules: rinkImport.schedules,
    information_fr: rinkImport.information,
    description_fr: rinkImport.description,
    is_active: false
  }

  const insertedRink = await insertRink(rink as Rink);
  await insertUpdatedRink(insertedRink.id, {
    update_param: rinkImport.updater.update_params,
    update_method: rinkImport.updater.type,
    is_active: true,
  });


  displayObject(insertedRink);

  console.log("✅ Rink created successfully!\n");
}

function listRinks(rinks: Rink[] = []) {
  new Table()
    .header(["ID", "Name", "desc", "Type", "Active"])
    .body(
      rinks.map(({ id, name, description, type, is_active }) => [
        id?.toString() ?? "-",
        name,
        description,
        type,
        is_active ? "✅" : "❌",
      ])
    )
    .border()
    .render();
}

async function searchRinksList() {
  const name = await Input.prompt(
    "Enter the name of the rink: (enter to list all)"
  );
  if (name) await listRinks(await searchRinks(name));
  else await listRinks(await getRinks());
}

async function toggleRink() {
  const rinks = await getRinks();
  await searchRinksList();
  const rinkId = await Input.prompt("Enter Rink ID to toggle active status:");
  const rink = rinks.find((r) => r.id === Number(rinkId));
  if (rink) {
    await toggleRinkInDB(rink.id);
    console.log(
      `Rink ${rink.name} is now ${!rink.is_active ? "Active" : "Inactive"}.`
    );
  } else {
    console.log("❌ Rink not found.");
  }
}

async function infoRink() {
  const rinks = await getRinks();
  await searchRinksList();
  const rinkId = await Input.prompt("Enter Rink ID to view details:");
  const rink = rinks.find((r) => r.id === Number(rinkId));
  if (!rink) {
    console.log("❌ Rink not found.");
    return;
  }
  displayObject(rink);
}

await new Command()
  .name("On-patine CLI")
  .version("1.0.0")
  .description("Command line Helper for On-patine")
  .usage("[options]")
  .command("create", "Create a new rink")
  .action(async () => {
    await createRink();
  })
  .command("search", "search rinks")
  .action(async () => {
    await searchRinksList();
  })
  .command("toggle", "Enable/Disable a rink")
  .action(async () => {
    await toggleRink();
  })
  .command("update", "Update a rink")
  .action(async () => {
    console.log("Update rink");
  })
  .command("condition", "Update a rink condition")
  .action(async () => {
    console.log("Update rink condition");
  })
  .command("info", "View rink details")
  .action(async () => {
    await infoRink();
  })
  .command("rink_map", "Update rink static maps")
  .action(async () => {
    await updateRinkMaps();
  })
  .parse(Deno.args);
