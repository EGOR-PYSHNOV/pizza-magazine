import { pizzaItem } from './../../typescript/types';
import { ActionTypesPizzas, PizzaActionType } from '../actions/pizzas';

const initialState = {
  items: [] as pizzaItem[],
  isLoaded: false,
};

type StateType = typeof initialState;

const pizzas = (state: StateType = initialState, action: ActionTypesPizzas): StateType => {
  switch (action.type) {
    case PizzaActionType.FETCH_PIZZAS:
      return {
        ...state,
        isLoaded: true,
      };
    case PizzaActionType.SET_PIZZAS:
      return {
        ...state,
        items: action.payload,
        isLoaded: true,
      };
    case PizzaActionType.SET_LOADED:
      return {
        ...state,
        isLoaded: action.payload,
      };

    default:
      return state;
  }
};

export default pizzas;
