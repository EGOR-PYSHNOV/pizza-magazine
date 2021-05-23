import { ActionsTypesFilters, SET_SORT_BY, SET_CATEGORY } from './../actions/filters';

type Null<T> = null | T;

const initialState = {
  category: null as Null<number>,
  sortBy: {
    type: 'popular',
    order: 'desc',
  },
};

type initialStateType = typeof initialState;

const filters = (
  state: initialStateType = initialState,
  action: ActionsTypesFilters,
): initialStateType => {
  if (action.type === SET_SORT_BY) {
    return {
      ...state,
      sortBy: action.payload,
    };
  } else if (action.type === SET_CATEGORY) {
    return {
      ...state,
      category: action.payload,
    };
  }
  return state;
};

export default filters;
