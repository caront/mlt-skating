import { District } from "./District";

export interface City {
  id: number;
  name: string;
  districts: District[];
}
