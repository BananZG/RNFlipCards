import React from 'react';
import { Provider } from 'react-redux';
import HomeStackNavigator from './navigator';
import store from './reducers/reducerStore';

const App = () => {
  return (
    <Provider store={store}>
      <HomeStackNavigator />
    </Provider>
  );
};

export default App;
