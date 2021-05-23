export const SET_SORT_BY = 'SET_SORT_BY';
export const SET_CATEGORY = 'SET_CATEGORY';

type setSoryBy = {
  type: string;
  order: string;
};


export const setSortBy = ({ type, order }: setSoryBy) =>
  ({
    type: SET_SORT_BY,
    payload: { type, order },
  } as const);

export const setCategory = (catIndex: number) =>
  ({
    type: SET_CATEGORY,
    payload: catIndex,
  } as const);

export type ActionsTypesFilters = ReturnType<typeof setSortBy> | ReturnType<typeof setCategory>;
