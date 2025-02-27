import supabase from "../supabase.ts";
import { getRinkLastCondition } from "./utils.ts";
import DayJs from "https://esm.sh/dayjs@1.11.10";
const syncData = async (rinkId: string, rinkUpdateParam: any) => {
  const lastRinkCondition = await getRinkLastCondition(rinkId);
  console.log("lastRinkCondition", lastRinkCondition);
  const hasToInsertNewConditions =
    !lastRinkCondition ||
    DayJs().diff(DayJs(lastRinkCondition.updated_at), "day") > 0;
  if (hasToInsertNewConditions) {
    const { data: newCondition, error: newConditionError } = await supabase()
      .from("conditions")
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
    console.log("New condition inserted", newCondition);
  }
};

export default syncData;
