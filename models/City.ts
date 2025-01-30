import { District } from "./Rink";

export interface City {
  id: number;
  name: string;
  districts: District[];
}
