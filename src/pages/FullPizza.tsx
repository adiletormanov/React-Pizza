//19 урок useParams

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FullPizza: React.FC = () => { // 21 FullPizza ты теперь React.FC., т.е это Functional component - функциональный компонент
  const [pizza, setPizza] = React.useState<{
		imageUrl: string;
		name: string;
		price: string; // 21 сказали useState ты должен содержать в себе только определенный тип данных. Мы открываем <> информацию это объект и в нем есть определенные типы
	}>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://6433e582582420e2316e5607.mockapi.io/items/' + id,
        );
        setPizza(data);
      } catch (error) {
        alert('ошибка при получении пиццы!');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    // если пицца еще не загрузилась , то тогда не рендерим pizza
    return <>Загрузка...</>; 
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.name}</h2>
      <h4>{pizza.price} P </h4>
    </div>
  );
};

export default FullPizza;
