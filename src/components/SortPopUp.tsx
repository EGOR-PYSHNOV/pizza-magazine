import React,{KeyboardEvent } from 'react';

type sortItemsType = {
  name: string;
  type: string;
  order: string;
};


interface ISortPopUp {
  items: sortItemsType[];
  activeSortType: string;
  onClickSortType(type: string): void;
}

const SortPopUp: React.FC<ISortPopUp> = React.memo(function SortPopUp({
  items,
  activeSortType,
  onClickSortType,
}) {
  const [showPopUp, setPopUp] = React.useState(false);
  const activeLabel = items.find((item) => item.type === activeSortType)?.name;
  const sortRef = React.useRef<HTMLDivElement>(null);
  const toggleVisiblePopUp = (): void => {
    setPopUp(!showPopUp);
  };

  const handleOutsideClick = (e:any): void => {
    const path = (e.composedPath && e.composedPath()) || e.composedPath(e.target);

    if (!path.includes(sortRef.current)) {
      setPopUp(false);
    }
  };


  const onSelectItem: Function = (type: string): void => {
    onClickSortType(type);
    setPopUp(false);
  };

  React.useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={showPopUp ? 'rotated' : ''}>
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={toggleVisiblePopUp}>{activeLabel}</span>
      </div>
      {showPopUp && (
        <div className="sort__popup">
          <ul>
            {items && 
              items.map((obj) => {
                return (
                  <li
                    className={activeSortType === obj.type ? 'active' : ''}
                    key={obj.name}
                    onClick={() => onSelectItem(obj)}>
                    {obj.name}
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
});

export default SortPopUp;
