import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CartItem, addItem } from '../../redux/slices/cartSlice';
import { selectCartItemById } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

type PizzaBlockProps = {
  //22 типизация
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  name,
  price,
  imageUrl,
  sizes,
  types,
}) => {
  const typeNames = ['тонкое', 'традиционное'];

  const [activeSize, setActiveSize] = React.useState(0);
  const [activeType, setActiveType] = React.useState(0);

  const dispatch = useDispatch();

  const cartItem = useSelector(selectCartItemById(id));
  // const cartItem = useSelector((state) =>
  //   state.cart.items.find((obj) => obj.id === id),); //16 №10 когда мы рендерим какую то пиццу мы знаем какой у него id , во всем нашем массиве мы будем искать пиццу у которой есть такой же id и его рендерим

  const addedCount = cartItem ? cartItem.count : 0; //16 №11 Если в корзине нашелся этот товар, то из него вытаскиваем Count иначе передаем 0. (смотри в самом низу)

  const onClickAdd = () => {
    //16 №6 мы тут сгенерируем {объект} товар который будем добавлять
    const item: CartItem = {
      //24
      id,
      name,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addItem(item)); //16 №7 тут вызывем addItem и ему передаем item
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
			<Link key={id} to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{name}</h4>
				</Link>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeId) => (
              <li
                key={typeId}
                onClick={() => setActiveType(typeId)}
                className={activeType === typeId ? 'active' : ''}
              >
                {typeNames[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map(
              (
                size,
                index, //
              ) => (
                <li
                  key={size}
                  onClick={() => setActiveSize(index)}
                  className={activeSize === index ? 'active' : ''}
                >
                  {size} см.
                </li>
              ),
            )}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            onClick={onClickAdd} //16 №8 добавляем onClick
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};
export default PizzaBlock;
