export type Action =
  | { type: "RESET_OPTIONS" }
  | { type: "SEARCH_RINK_NAME"; payload: string }
  | { type: "SEARCH_FAVORITE"; payload: boolean }
  | { type: "SEARCH_RINK_OPEN"; payload: boolean }
  | { type: "SEARCH_RINK_DISTRICT"; payload: number[] }
  | { type: "SEARCH_RINK_TYPE"; payload: string[] }
  | { type: "SEARCH_RINK_CONDITION"; payload: string[] };

export type RinkGroupSearchOption = {
  name: string;
  onlyOpen: boolean;
  onlyFavorite: boolean;
  districts: number[];
  type: string[];
  conditions: string[];
};

export const defaultSearchOption: RinkGroupSearchOption = {
  name: "",
  onlyOpen: false,
  onlyFavorite: false,
  districts: [],
  type: [],
  conditions: [],
};



export const rinkGroupReducer = (
  state: RinkGroupSearchOption = defaultSearchOption,
  action: Action
): RinkGroupSearchOption => {
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
