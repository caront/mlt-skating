export interface Rink extends Coordinate {
  id: string;
  name: string;
  description: string;
  type: string;
  rink_name: string;
  district: District;
}

export interface District {
  id: string;
  name: string;
  code: string;
}

export interface DistrictWithRinks extends District, RinkList {}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface RinkWithDistrict extends Rink, District {}

export interface RinkWithDistrictAndCondition
  extends RinkWithDistrict,
    Condition {}

export interface RinkList {
  rinks: Rink[];
}

export interface Condition {
  open: boolean;
  cleared: boolean;
  watered: boolean;
  resurfaced: boolean;
  condition: ECondition;
  lastUpdate: string;
}

export interface RinkHistory {
  date: string;
  open: boolean;
  cleared: boolean;
  watered: boolean;
  resurfaced: boolean;
  condition: string;
}

export enum ECondition {
  Excellente = "EXCELLENTE",
  Good = "GOOD",
  Bad = "BAD",
  NA = "NA"
}
