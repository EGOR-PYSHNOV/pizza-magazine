import { combineReducers } from 'redux';
import filters from './filters';
import pizzas from './pizzas';
import cart from './cart';

const rootReducer = combineReducers({
  filters,
  pizzas,
  cart,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
export default rootReducer;
