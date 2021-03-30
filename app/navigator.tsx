import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/welcome';
import { useColorScheme } from 'react-native';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={WelcomeScreen}
          options={{
            headerStyle: {
              backgroundColor: isDarkMode ? 'black' : 'white',
            },
            headerTitleStyle: {
              color: isDarkMode ? 'white' : 'black',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeStackNavigator;
