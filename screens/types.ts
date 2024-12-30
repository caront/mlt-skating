import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Place} from '../models/Place';

export type PlaceInformationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PlaceInformation'
>;

export type RootStackParamList = {
  PlaceList: undefined;
  PlaceInformation: {place: Place};
  TestScreen: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
