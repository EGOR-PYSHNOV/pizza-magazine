export type pizzaItem = {
  id: number;
  imageUrl: string;
  name: string;
  type: number[] | undefined;
  size: number[] | undefined;
  price: number;
  category: number | null;
  rating: number;
};

export type SortByType = {
  type: string;
  order: string;
};
