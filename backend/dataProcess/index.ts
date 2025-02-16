import supabase from "../supabase";
import syncOpenDataMLT from "./openDataMlt.ts";
import syncParcJeanDrapeau from "./parcJeanDrapeau.ts";

// deno-lint-ignore no-explicit-any
const dataUpdater: {
  [key: string]: (rinkID: string, rinkParam: any) => Promise<void>;
} = {
  OPEN_DATA_MLT: syncOpenDataMLT,
  JEAN_DRAPEAU: syncParcJeanDrapeau,
};

async function syncRinkConditions(): Promise<void> {
  const { data: rinkUpdate, error: rinkUpdateError } = await supabase
    .from("rink_update")
    .select("*")
    .eq("is_active", true)
    .eq("update_method", 'JEAN_DRAPEAU')

  if (rinkUpdateError) {
    console.error("Error fetching rink update data", rinkUpdateError);
    return;
  }

  for (const rink of rinkUpdate) {
    const { rink_id, update_params, update_method } = rink;
    const updater = dataUpdater[update_method];
    if (!updater) {
      console.error(`No updater found for source: ${update_method}`);
      continue;
    }
    try {
      console.log(`Syncing rink ${rink_id} from ${update_method} `);
      await updater(rink_id, update_params);
    } catch (e) {
      console.error(`Error syncing rink ${rink_id} from ${update_method}:`, e);
    }
  }
}

export default syncRinkConditions;
