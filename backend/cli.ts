// deno run --allow-net --allow-read --allow-write --allow-env rink_cli.ts

import { parse } from "https://deno.land/std@0.204.0/flags/mod.ts";
import { Input } from "jsr:@cliffy/prompt@^1.0.0-rc.7";
import { Table } from "jsr:@cliffy/table@^1.0.0-rc.7";
import { getRinks } from "./api/rinks/rinkService.ts";
import { Rink } from "./api/rinks/rink.ts";

// const rinks: Rink[] = [];

async function createRink() {
  const rinks = await getRinks();
  const filePath = await Input.prompt("Enter the path to the rink JSON file:");
  const jsonData = await Deno.readTextFile(filePath);
  const rink: Rink = JSON.parse(jsonData);

  console.log("\nReview Rink Details:");
  for (const key in rink) {
    const value = rink[key as keyof Rink];
    const isConfirmed = await confirm(`Is "${key}: ${value}" correct?`);
    if (!isConfirmed) {
      const newValue = await Input.prompt(`Enter new value for ${key}:`);
      (rink as any)[key] = isNaN(Number(newValue))
        ? newValue
        : Number(newValue);
    }
  }

  rink.id = rinks.length + 1;
  rinks.push(rink);
  console.log("✅ Rink created successfully!\n");
}

async function listRinks() {
  const rinks = await getRinks();
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

async function toggleRink() {
  const rinks = await getRinks();

  listRinks();
  const rinkId = await Input.prompt("Enter Rink ID to toggle active status:");
  const rink = rinks.find((r) => r.id === Number(rinkId));
  if (rink) {
    rink.is_active = !rink.is_active;
    console.log(
      `Rink ${rink.name} is now ${rink.is_active ? "Active" : "Inactive"}.`
    );
  } else {
    console.log("❌ Rink not found.");
  }
}

async function run() {
  const args = parse(Deno.args);

  switch (args._[0]) {
    case "create":
      await createRink();
      break;
    case "list":
      await listRinks();
      break;
    case "toggle":
      await toggleRink();
      break;
    default:
      console.log("Usage:");
      console.log("  deno run rink_cli.ts create   - Create a new rink");
      console.log("  deno run rink_cli.ts list     - List all rinks");
      console.log("  deno run rink_cli.ts toggle   - Enable/Disable a rink");
  }
}

run();
