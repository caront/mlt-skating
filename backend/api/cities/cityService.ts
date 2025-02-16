import { City } from "./cityModel";
import supabase from "../../supabase.ts";

export async function getCities(): Promise<City[]> {
  const { data, error } = await supabase.from("cities").select("*");
  if (error) {
    throw error;
  }
  return data;
}

export async function getCity(id: number): Promise<City | undefined> {
  const { data, error } = await supabase
    .from("cities")
    .select("*")
    .eq("id", id);
  if (error) {
    throw error;
  }
  return data[0];
}

export async function createCity(city: City): Promise<City> {
  const { data, error } = await supabase
    .from("cities")
    .insert([city])
    .select("*");
  if (error) {
    throw error;
  }
  return data[0];
}

export async function updateCity(city: City): Promise<City> {
  const { data, error } = await supabase
    .from("cities")
    .update(city)
    .eq("id", city.id)
    .select("*");
  if (error) {
    throw error;
  }
  return data[0];
}

export async function deleteCity(id: number): Promise<void> {
    const { error } = await supabase.from("cities").delete().eq("id", id);
    if (error) {
        throw error;
    }
}
