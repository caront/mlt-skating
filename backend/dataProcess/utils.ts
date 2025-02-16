import supabase from "../supabase.ts";

export enum ECondition {
  Excellente = "EXCELLENTE",
  Good = "GOOD",
  Bad = "BAD",
  NA = "NA",
}

const CONDITIONS = {
  Excellente: ECondition.Excellente,
  Bonne: ECondition.Good,
  Mauvaise: ECondition.Bad,
  "N/A": ECondition.NA,
};

interface RinkCondition {
  updated_at: string;
  open: boolean;
  cleared: boolean;
  watered: boolean;
  resurfaced: boolean;
  condition: ECondition;
}

async function getRinkLastCondition(
  rinkId: string
): Promise<RinkCondition | null> {
  const { data: rinkLastCondition, error: rinkLastConditionError } =
    await supabase
      .from("conditions")
      .select()
      .eq("rink_id", rinkId)
      .order("updated_at", {
        ascending: false,
      })
      .limit(1);

  if (rinkLastConditionError) {
    console.error("Error fetching rink last condition", rinkLastConditionError);
    return null;
  }
  return rinkLastCondition[0] ?? null;
}

export { getRinkLastCondition, CONDITIONS };
export type { RinkCondition };
