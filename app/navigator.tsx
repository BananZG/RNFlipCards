import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from 'react-native';
import { Routes } from './types/navigations';
import WelcomeScreen from './screens/welcome';
import GameScreen from './screens/game';
import ScoreboardScreen from './screens/scoreboard';

const Stack = createStackNavigator();
const Screens: {
  name: Routes;
  title: string;
  component: React.FC<any>;
}[] = [
  {
    name: 'WelcomeScreen',
    title: 'Welcome',
    component: WelcomeScreen,
  },
  {
    name: 'GameScreen',
    title: 'Game',
    component: GameScreen,
  },
  {
    name: 'ScoreboardScreen',
    title: 'Scoreboard',
    component: ScoreboardScreen,
  },
];

const HomeStackNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {Screens.map(({ name, title, component }) => (
          <Stack.Screen
            key={name}
            name={name}
            component={component}
            options={{
              title,
              headerStyle: {
                backgroundColor: isDarkMode ? 'black' : 'white',
              },
              headerTitleStyle: {
                color: isDarkMode ? 'white' : 'black',
              },
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeStackNavigator;
