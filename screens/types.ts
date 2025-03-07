import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Rink, RinkWithCondition } from "../models/Rink";

// export type RinkInformationScreenProps = NativeStackScreenProps<
//   RootStackParamList,
//   "RinkInformation"
// >;

export type RinkInformationScreenProps = NativeStackNavigationProp<
  RootStackParamList,
  "RinkInformationScreen"
>;

export type RootStackParamList = {
  RinkList: undefined;
  RinkInformationScreen: { rink: Rink };
  About: undefined;
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
