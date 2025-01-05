export interface Rink {
  name: string;
  description: string;
  type: string;
  rink_name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface District {
  district: string;
  districtAbv: string;
  coordinates: Coordinate;
}

export interface DistrictWithRinks extends District, RinkList {}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface RinkWithDistrict extends Rink, District {}

export interface RinkWithDistrictAndCondition extends RinkWithDistrict, Condition {}

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
  Excellente = 'Excellente',
  Good = 'Bonne',
  Bad = 'Mauvaise',
  NA = 'N/A',
}