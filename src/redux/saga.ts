import { all } from 'redux-saga/effects';
import { pizzasSaga } from './saga/saga';
export default function* rootSaga() {
  yield all([pizzasSaga()]);
}
