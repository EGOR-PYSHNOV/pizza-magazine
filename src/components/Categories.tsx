import React from 'react';

interface ICategories {
  items: string[];
  activeCategory: number;
  onClickCategory(category: number | null): void;
}

const Categories: React.FC<ICategories> = React.memo(function Categories({
  activeCategory,
  items,
  onClickCategory,
}) {
  return (
    <div className="categories">
      <ul>
        <li
          className={activeCategory === null ? 'active' : ''}
          onClick={() => onClickCategory(null)}>
          Все
        </li>
        {items && 
          items.map((cat, index) => {
            return (
              <li
                className={activeCategory === index ? 'active' : ''}
                onClick={() => onClickCategory(index)}
                key={cat}>
                {cat}
              </li>
            );
          })}
      </ul>
    </div>
  );
});

export default Categories;
