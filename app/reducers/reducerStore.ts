import { combineReducers, createStore } from 'redux';

const reducers = combineReducers({
  temp: () => ({}), // template to be removed
  // add other reducers in here
});

export default createStore(reducers);
