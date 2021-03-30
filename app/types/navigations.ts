import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  WelcomeScreen: undefined;
  GameScreen: undefined;
  ScoreboardScreen: undefined;
};

export type Routes = keyof RootStackParamList;

export type WelcomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'WelcomeScreen'
>;

export type GameScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GameScreen'
>;

export type ScoreboardScreenScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ScoreboardScreen'
>;
