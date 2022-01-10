import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum RouteNames {
  StoreItems = 'StoreItems',
  ShoppingCart = 'ShoppingCart',
  ItemDetail = 'ItemDetail',
  Counter = 'Counter',
  Dogs = 'Dogs',
}

export type RootStackParamList = {
  [RouteNames.Counter]: undefined;
  [RouteNames.Dogs]: undefined;
  [RouteNames.ItemDetail]: undefined;
};

export interface NavProps {
  [RouteNames.Counter]: NativeStackScreenProps<
    RootStackParamList,
    RouteNames.Counter
  >;
  [RouteNames.Dogs]: NativeStackScreenProps<
    RootStackParamList,
    RouteNames.Dogs
  >;
  [RouteNames.ItemDetail]: NativeStackScreenProps<
    RootStackParamList,
    RouteNames.ItemDetail
  >;
}

export enum NAV_KEYS {
  PERSISTENCE_KEY = 'NAVIGATION_STATE',
}
