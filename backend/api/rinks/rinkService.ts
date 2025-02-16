import { Rink } from "./rink.ts";
import supabase from "../../supabase.ts";

export async function getRinks(): Promise<Rink[]> {
  const { data, error } = await supabase.from("rinks").select("*");
  if (error) {
    throw error;
  }
  return data;
}

export async function getRink(id: string): Promise<Rink | undefined> {
  const { data, error } = await supabase
    .from("rinks")
    .select("*")
    .eq("id", id);
  if (error) {
    throw error;
  }
  return data[0];
}

export async function getRinksByDistrict(districtId: number): Promise<Rink[]> {
  const { data, error } = await supabase
    .from("rinks")
    .select("*")
    .eq("district_id", districtId);
  if (error) {
    throw error;
  }
  return data;
}

export async function createRink(rink: Rink): Promise<Rink> {
  const { data, error } = await supabase
    .from("rinks")
    .insert([rink])
    .select("*");
  if (error) {
    throw error;
  }
  return data[0];
}

export async function updateRink(rink: Rink): Promise<Rink> {
  const { data, error } = await supabase
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
  const { error } = await supabase.from("rinks").delete().eq("id", id);
  if (error) {
    throw error;
  }
}

