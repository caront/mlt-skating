import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Rink, RinkWithDistrictAndCondition} from '../models/Rink';

export type RinkInformationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'RinkInformation'
>;

export type RootStackParamList = {
  RinkList: undefined;
  RinkInformation: {rink: RinkWithDistrictAndCondition};
  TestScreen: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
