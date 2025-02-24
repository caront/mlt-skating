export interface Rink {
  id: number;
  name: string;
  description: string;
  type: string;
  rink_name: string;
  district_id: number;
  lastUpdate: string;
  latitude: number;
  longitude: number;
  public_url: string;
  description_fr: string;
  description_en: string;
  information: string;
  information_fr: string;
  information_en: string;
  address: string;
  schedules?: Schedule[];
  services?: string[];
  is_active: boolean;
}

export interface Schedule {
  dayOfWeek: string;
  opens: string;
  closes: string;
  validFrom: string;
  validThrough: string;
}
