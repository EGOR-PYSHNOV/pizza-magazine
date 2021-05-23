import React from 'react';
import { Categories, SortPopUp, PizzaBlock, PizzaLoadingBlock } from '../components';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPizzas } from '../redux/actions/pizzas';
import { addPizzaToCart } from '../redux/actions/cart';
import { AppStateType } from '../redux/reducers/index';
import { pizzaItem } from '../typescript/types';
const categoryNames: string[] = ['Мясные', 'Вегетерианские', 'Гриль', 'Острые', 'Закрытые'];

type sortItemsType = {
  name: string;
  type: string;
  order: string;
};

function Home() {
  const dispatch = useDispatch();
  const pizzas: pizzaItem[] = useSelector(({ pizzas }: AppStateType) => pizzas.items);
  const isLoaded = useSelector(({ pizzas }: AppStateType) => pizzas.isLoaded);

  interface cartItemsType {
    [key: string]: {
      items: pizzaItem[];
      totalPrice: number;
    };
  }

  const cartItems: cartItemsType = useSelector(({ cart }: AppStateType) => cart.items);

  const { category, sortBy } = useSelector(({ filters }: AppStateType) => filters);

  const sortItems: sortItemsType[] = [
    { name: 'популярности', type: 'popular', order: 'desc' },
    { name: 'цене', type: 'price', order: 'desc' },
    { name: 'алфавиту', type: 'name', order: 'asc' },
  ];

  const OnSelectCategory = React.useCallback((index): void => {
    dispatch(setCategory(index));
  }, []);

  const OnAddPizzaToCart = React.useCallback((pizzaObj): void => {
    dispatch(addPizzaToCart(pizzaObj));
  }, []);

  const OnSelectSortType = React.useCallback((type): void => {
    dispatch(setSortBy(type));
  }, []);

  React.useEffect(() => {
    dispatch(fetchPizzas({ category, sortBy }));
  }, [category, sortBy]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={category}
          items={categoryNames}
          onClickCategory={OnSelectCategory}
        />
        <SortPopUp
          activeSortType={sortBy.type}
          items={sortItems}
          onClickSortType={OnSelectSortType}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? pizzas &&
            pizzas.map((pizza: pizzaItem) => (
              <PizzaBlock
                OnAddPizzaToCart={OnAddPizzaToCart}
                addedCount={cartItems[pizza.id] && cartItems[pizza.id].items.length}
                key={pizza}
                {...pizza}
              />
            ))
          : Array(12)
              .fill(0)
              .map((_, index) => <PizzaLoadingBlock key={index} />)}
      </div>
    </div>
  );
}

export default Home;
