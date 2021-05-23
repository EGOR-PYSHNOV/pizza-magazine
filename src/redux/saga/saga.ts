import { PizzaActionType, fetchPizzaActionInterface } from '../actions/pizzas';
import { PizzaApi } from '../../api/pizzaApi';
import { call, put, takeLatest } from 'redux-saga/effects';
import { setPizzas } from '../actions/pizzas';

import { pizzaItem } from '../../typescript/types';

export function* fetchPizzasRequest({ payload }: fetchPizzaActionInterface) {
  try {
    const pizzas: pizzaItem[] = yield call(PizzaApi.fetchPizzas, payload);

    yield put(setPizzas(pizzas));
  } catch (e) {
    console.log(e, 'error');
  }
}

export function* pizzasSaga() {
  yield takeLatest(PizzaActionType.FETCH_PIZZAS, fetchPizzasRequest);
}
