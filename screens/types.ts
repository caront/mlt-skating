import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Rink, RinkWithCondition } from "../models/Rink";

export type RinkInformationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "RinkInformation"
>;

export type RootStackParamList = {
  RinkList: undefined;
  RinkInformation: { rink: Rink };
  AboutScreen: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
