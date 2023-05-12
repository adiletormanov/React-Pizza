import React from "react";
import  useWhyDidYouUpdate  from "ahooks/lib/useWhyDidYouUpdate";

type CategoriesProps= { //22 этот тип говорит, что он объект
value: number;
onClickCategory: (index: number) => void ; // 23 функция не требует возвращения какого то значения
};

const Categories: React.FC <CategoriesProps> = React.memo(({ value, onClickCategory }) => { //22 компонент ты являешься FC, в FC хранит в себя пропсы
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

	useWhyDidYouUpdate('Categories' , {value, onClickCategory})

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={value === index ? 'active' : ''}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
})

export default Categories;


// 25 добавили React.memo нужен для того чтоб предотвратить лишнюю перерисовку
