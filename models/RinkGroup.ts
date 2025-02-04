import { District } from "./District";
import { Coordinate, RinkWithDistrictAndConditionLastUpdate } from "./Rink";

export interface Schedule {
  dayOfWeek: string;
  opens: string;
  closes: string;
  validFrom: string;
  validThrough: string;
}

export interface RinkGroup extends Coordinate {
  id: number;
  name: string;
  description: string;
  services: string[];
  hours: Schedule[];
  district: District;
}
