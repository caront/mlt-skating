import { Condition } from "./Rink";

export interface ConditionChanges {
  previous: Condition | null;
  current: Condition;
}
