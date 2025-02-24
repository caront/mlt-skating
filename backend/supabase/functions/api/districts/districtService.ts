import { District } from "./distirct.ts";
import supabase from "../../supabase.ts";

export async function getDistricts(): Promise<District[]> {
  const { data, error } = await supabase().from("districts").select("*");
  if (error) {
    throw error;
  }
  return data;
}

export async function getDistrict(id: number): Promise<District | undefined> {
  const { data, error } = await supabase()
    .from("districts")
    .select("*")
    .eq("id", id);
  if (error) {
    throw error;
  }
  return data[0];
}

export async function getDistrictByCode(
  code: string
): Promise<District | undefined> {
  const { data, error } = await supabase()
    .from("districts")
    .select("*")
    .eq("code", code);
  if (error) {
    throw error;
  }
  return data[0];
}

export async function getCityDistricts(cityId: number): Promise<District[]> {
  const { data, error } = await supabase()
    .from("districts")
    .select("*")
    .eq("city_id", cityId);
  if (error) {
    throw error;
  }
  return data;
}

export async function createDistrict(district: District): Promise<District> {
  const { data, error } = await supabase()
    .from("districts")
    .insert([district])
    .select("*");
  if (error) {
    throw error;
  }
  return data[0];
}

export async function updateDistrict(district: District): Promise<District> {
  const { data, error } = await supabase()
    .from("districts")
    .update(district)
    .eq("id", district.id)
    .select("*");
  if (error) {
    throw error;
  }
  return data[0];
}

export async function deleteDistrict(id: number): Promise<void> {
  const { error } = await supabase().from("districts").delete().eq("id", id);
  if (error) {
    throw error;
  }
}
