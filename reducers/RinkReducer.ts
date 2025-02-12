export type LocationSearch = {
  latitude: number;
  longitude: number;
};

const defaultLocation = {
  latitude: 45.5019,
  longitude: -73.5674,
};

export type Action =
  | { type: "RESET_OPTIONS" }
  | { type: "SEARCH_RINK_NAME"; payload: string }
  | { type: "SEARCH_FAVORITE"; payload: boolean }
  | { type: "SEARCH_RINK_OPEN"; payload: boolean }
  | { type: "SEARCH_RINK_DISTRICT"; payload: number[] }
  | { type: "SEARCH_RINK_TYPE"; payload: string[] }
  | { type: "SEARCH_RINK_CONDITION"; payload: string[] }
  | {
      type: "SEARCH_RINK_POSITION";
      payload: LocationSearch;
    };

export type RinkSearchOption = {
  name: string;
  onlyOpen: boolean;
  onlyFavorite: boolean;
  districts: number[];
  type: string[];
  conditions: string[];
  location: LocationSearch;
};

export const defaultSearchOption: RinkSearchOption = {
  name: "",
  onlyOpen: false,
  onlyFavorite: false,
  districts: [],
  type: [],
  conditions: [],
  location: defaultLocation,
};

export const rinkReducer = (
  state: RinkSearchOption = defaultSearchOption,
  action: Action
): RinkSearchOption => {
  switch (action.type) {
    case "RESET_OPTIONS":
      return defaultSearchOption;
    case "SEARCH_RINK_NAME":
      return { ...state, name: action.payload };
    case "SEARCH_RINK_OPEN":
      return { ...state, onlyOpen: action.payload };
    case "SEARCH_RINK_DISTRICT":
      return { ...state, districts: action.payload };
    case "SEARCH_RINK_TYPE":
      return { ...state, type: action.payload };
    case "SEARCH_RINK_CONDITION":
      return { ...state, conditions: action.payload };
    case "SEARCH_FAVORITE":
      return { ...state, onlyFavorite: action.payload };
    default:
      return state;
  }
};
