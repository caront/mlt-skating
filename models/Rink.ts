export interface Rink extends Coordinate, WithStaticMap {
  id: number;
  name: string;
  description: string;
  type: string;
  rink_name: string;
  district: District;
  lastUpdate: string;
  isFav: boolean;
}

interface WithStaticMap {
  public_url? : string;
}

export interface District {
  id: number;
  name: string;
  code: string;
}

export interface ConditionLastUpdate {
  lastTimeOpen: string | null;
  lastTimeCleared: string | null;
  lastTimeWatered: string | null;
  lastTimeResurfaced: string | null;
  openSince: string | null;
}

export interface DistrictWithRinks extends District, RinkList {}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface ConditionAndLastUpdate
  extends Condition,
    ConditionLastUpdate {}

export interface RinkWithDistrict extends Rink, District {}

export interface RinkWithCondition extends Rink, Condition {}

export interface RinkWithDistrictAndConditionLastUpdate
  extends Rink, ConditionAndLastUpdate {}

export interface RinkList {
  rinks: Rink[];
}

export interface Condition {
  id: number;
  open: boolean;
  cleared: boolean;
  watered: boolean;
  resurfaced: boolean;
  condition: ECondition;
  updatedAt: string;
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
  NA = "NA",
}

export const defaultRink: Rink = {
  id: 0,
  name: "",
  description: "",
  type: "",
  rink_name: "",
  district: {
    id: 0,
    name: "",
    code: "",
  },
  lastUpdate: "",
  latitude: 0,
  longitude: 0,
  isFav: false,
  public_url: "",
};

export const defaultCondition: Condition = {
  id: 0,
  open: false,
  cleared: false,
  watered: false,
  resurfaced: false,
  condition: ECondition.NA,
  updatedAt: "",
};

export const defaultRinkWithCondition: RinkWithCondition = {
  ...defaultRink,
  ...defaultCondition,
};

export const defaultRinkWithDistrict: RinkWithDistrict = {
  ...defaultRink,
  district: {
    id: 0,
    name: "",
    code: "",
  },
  code: "",
};

export const defaultRinkWithDistrictAndConditionLastUpdate: RinkWithDistrictAndConditionLastUpdate =
  {
    ...defaultRinkWithDistrict,
    ...defaultCondition,
    lastTimeCleared: null,
    lastTimeOpen: null,
    lastTimeResurfaced: null,
    lastTimeWatered: null,
    openSince: null,
  };
