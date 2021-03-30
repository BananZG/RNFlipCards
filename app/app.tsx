import React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeStackNavigator from './navigator';
import store from './reducers/reducerStore';

const App = () => {
  return (
    <PaperProvider>
      <Provider store={store}>
        <HomeStackNavigator />
      </Provider>
    </PaperProvider>
  );
};

export default App;
