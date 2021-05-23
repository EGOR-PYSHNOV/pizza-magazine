import axios from 'axios';
import { pizzaItem, SortByType } from '../typescript/types';

export const PizzaApi = {
  async fetchPizzas(payload: {
    category: number | null;
    sortBy: SortByType;
  }): Promise<pizzaItem[]> {
    const { data } = await axios.get(
      `http://localhost:3001/pizzas?${
        payload.category !== null ? `category=${payload.category}` : ''
      }&_sort=${payload.sortBy.type}&_order=${payload.sortBy.order}`,
    );

    return data;
  },
};
