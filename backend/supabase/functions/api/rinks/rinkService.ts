import { Rink } from "./rink.ts";
import supabase from "../../supabase.ts";

export async function getRinks(): Promise<Rink[]> {
  const { data, error } = await supabase().from("rinks").select("*");
  if (error) {
    throw error;
  }
  return data;
}

export async function searchRinks(search: string): Promise<Rink[]> {
  const { data, error } = await supabase()
    .from("rinks")
    .select("*")
    .textSearch("rink_name", search);
  if (error) {
    throw error;
  }
  return data;
}

export async function getRink(id: number): Promise<Rink | undefined> {
  const { data, error } = await supabase()
    .from("rinks")
    .select("*")
    .eq("id", id);
  if (error) {
    throw error;
  }
  return data[0];
}

export async function getRinksByDistrict(districtId: number): Promise<Rink[]> {
  const { data, error } = await supabase()
    .from("rinks")
    .select("*")
    .eq("district_id", districtId);
  if (error) {
    throw error;
  }
  return data;
}

export async function createRink(rink: Rink): Promise<Rink> {
  const { data, error } = await supabase()
    .from("rinks")
    .insert([rink])
    .select("*");
  if (error) {
    throw error;
  }
  return data[0];
}

export async function insertUpdatedRink(rinkId: number, rinkUpdateParam: {
  update_param: object;
  update_method: string;
  is_active: true;
}) {
  const { data: newCondition, error: newConditionError } = await supabase()
    .from("rink_update")
    .insert([
      {
        ...rinkUpdateParam,
        rink_id: rinkId,
      },
    ])
    .select("*");
  if (newConditionError) {
    throw newConditionError;
  }
  console.log("New updater inserted", newCondition);
}

export async function updateRink(rink: Rink): Promise<Rink> {
  const { data, error } = await supabase()
    .from("rinks")
    .update(rink)
    .eq("id", rink.id)
    .select("*");
  if (error) {
    throw error;
  }
  return data[0];
}

export async function deleteRink(id: string): Promise<void> {
  const { error } = await supabase().from("rinks").delete().eq("id", id);
  if (error) {
    throw error;
  }
}


export async function toggleRink(id: number): Promise<Rink> {
  const rink = await getRink(id);
  if (!rink) {
    throw new Error(`Rink not found for ID: ${id}`);
  }

  rink.is_active = !rink.is_active;

  return await updateRink(rink);
}
