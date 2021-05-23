import { pizzaItem } from './../../typescript/types';

export const ADD_PIZZA_CART = 'ADD_PIZZA_CART';
export const DELETE_PIZZA_CART = 'DELETE_PIZZA_CART';
export const PLUS_CART_ITEM = 'PLUS_CART_ITEM';
export const MINUS_CART_ITEM = 'MINUS_CART_ITEM';
export const CLEAR_CART = 'CLEAR_CART';


export const addPizzaToCart = (pizzaObj: pizzaItem) =>
  ({
    type: ADD_PIZZA_CART,
    payload: pizzaObj,
  } as const);

export const deletePizzaToCart = (pizzaId: number) =>
  ({
    type: DELETE_PIZZA_CART,
    payload: pizzaId,
  } as const);

export const plusCartItem = (pizzaId: number) =>
  ({
    type: PLUS_CART_ITEM,
    payload: pizzaId,
  } as const);

export const minusCartItem = (pizzaId: number) =>
  ({
    type: MINUS_CART_ITEM,
    payload: pizzaId,
  } as const);

export const clearCart = () =>
  ({
    type: CLEAR_CART,
  } as const);

export type ActionsTypesCart =
  | ReturnType<typeof addPizzaToCart>
  | ReturnType<typeof deletePizzaToCart>
  | ReturnType<typeof plusCartItem>
  | ReturnType<typeof minusCartItem>
  | ReturnType<typeof clearCart>;