import { pizzaItem, SortByType } from '../../typescript/types';
import { Action } from 'redux';
export enum PizzaActionType {
  SET_LOADED = 'SET_LOADED',
  SET_PIZZAS = 'SET_PIZZAS',
  FETCH_PIZZAS = 'FETCH_PIZZAS',
}

export interface fetchPizzaActionInterface extends Action<PizzaActionType> {
  type: PizzaActionType.FETCH_PIZZAS;
  payload: {
    category: number | null;
    sortBy: SortByType;
  };
}

export const setLoaded = (payload: boolean) =>
  ({
    type: PizzaActionType.SET_LOADED,
    payload,
  } as const);

export const setPizzas = (items: pizzaItem[]) =>
  ({
    type: PizzaActionType.SET_PIZZAS,
    payload: items,
  } as const);

export const fetchPizzas = (payload: {
  category: number | null;
  sortBy: SortByType;
}): fetchPizzaActionInterface =>
  ({
    type: PizzaActionType.FETCH_PIZZAS,
    payload,
  } as const);

export type ActionTypesPizzas =
  | ReturnType<typeof setLoaded>
  | ReturnType<typeof setPizzas>
  | ReturnType<typeof fetchPizzas>;
