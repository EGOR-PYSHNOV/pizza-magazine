import {
  ActionsTypesCart,
  ADD_PIZZA_CART,
  DELETE_PIZZA_CART,
  PLUS_CART_ITEM,
  MINUS_CART_ITEM,
  CLEAR_CART,
} from '../actions/cart';
import { pizzaItem } from './../../typescript/types';

export interface itemsType {
  items: {
    [key: string]: {
      items: pizzaItem[];
      totalPrice: number;
    };
  };
  totalPrice: number;
  totalCount: number;
}

const initialState: itemsType = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

type StateType = typeof initialState;

const getTotalPrice = (arr: pizzaItem[]) =>
  arr.reduce((sum: number, obj: pizzaItem) => obj.price + sum, 0);

const _get = (obj: { [key: string]: string }, path: string): string => {
  const [firstKey, ...keys] = path.split('.');

  return keys.reduce((val: any, key: string) => {
    console.log(val);

    return val[key];
  }, obj[firstKey]);
};

const getTotalSum = (obj: object, path: string) => {
  return Object.values(obj).reduce((sum, obj) => {
    const value = _get(obj, path);
    return sum + value;
  }, 0);
};

const cart = (state: StateType = initialState, action: ActionsTypesCart): StateType => {
  switch (action.type) {
    case ADD_PIZZA_CART: {
      const currentPizzaItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      };
      console.log(state.items);
      return {
        ...state,
        items: newItems,
        totalCount: state.totalCount + 1,
        totalPrice: state.totalPrice + action.payload.price,
      };
    }
    case DELETE_PIZZA_CART:
      const newItems = {
        ...state.items,
      };

      const currentTotalPrice = newItems[action.payload].totalPrice;
      const currentTotalCount = newItems[action.payload].items.length;
      delete newItems[action.payload];

      return {
        ...state,
        items: newItems,
        totalPrice: state.totalPrice - currentTotalPrice,
        totalCount: state.totalCount - currentTotalCount,
      };

    case PLUS_CART_ITEM: {
      const newObjItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];
      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }

    case MINUS_CART_ITEM: {
      const deleteObj = (id: number) => {
        const obj = {
          ...state.items,
        };
        delete obj[id];

        return obj;
      };
      const newObjItems = state.items[action.payload].items.slice(1);

      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };

      const totalCount = getTotalSum(newItems, 'items.length');
      const totalPrice = getTotalSum(newItems, 'totalPrice');

      return {
        ...state,
        items: state.items[action.payload].items.length <= 1 ? deleteObj(action.payload) : newItems,
        totalCount,
        totalPrice,
      };
    }

    case CLEAR_CART:
      return {
        ...state,
        ...initialState,
      };

    default:
      return state;
  }
};

export default cart;
