export interface Place {
  name: string;
  type: string;
  neibordhoods: Neibordhoods;
  open: boolean;
  cleared: boolean;
  watered: boolean;
  resurfaced: boolean;
  condition: Condition;
  lastUpdate: string;
  locations: Location;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Neibordhoods {
  name: string;
  abv: string;
  locations: Location;
}

export interface PlaceHistory {
  date: string;
  place: Place;
  open: boolean;
  cleared: boolean;
  watered: boolean;
  resurfaced: boolean;
  condition: string;
}


export enum Condition {
  Excellente = 'Excellente',
  Good = 'Bonne',
  Bad = 'Mauvaise',
  NA = 'N/A',
}