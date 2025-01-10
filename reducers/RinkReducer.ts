export type Action =
  | { type: "RESET_OPTIONS" }
  | { type: "SEARCH_RINK_NAME"; payload: string }
  | { type: "SEARCH_RINK_OPEN"; payload: boolean }
  | { type: "SEARCH_RINK_DISTRICT"; payload: string[] }
  | { type: "SEARCH_RINK_TYPE"; payload: string[] }
  | { type: "SEARCH_RINK_CONDITION"; payload: string[] };

export type RinkSearchOption = {
  name: string;
  onlyOpen: boolean;
  districts: string[];
  type: string[];
  conditions: string[];
};

export const defaultSearchOption: RinkSearchOption = {
  name: "",
  onlyOpen: false,
  districts: [],
  type: [],
  conditions: [],
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
    default:
      return state;
  }
};
