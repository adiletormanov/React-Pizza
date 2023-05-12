import React from 'react';

import qs from 'qs';

import { Link, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';

import {
  //17
  fetchPizzas,
  selectPizzaData,
} from '../redux/slices/pizzasSlice';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import { listType } from '../components/Sort';

const Home: React.FC = () => {
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { items, status } = useSelector(selectPizzaData); //17 №5 c помощью useSelector вытащим items

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  const sortType = sort.sortProperty;

  const onClickCategory = React.useCallback((id: number) => { //25 избавляемся от перерисовки. т.е мы говорим тут useCallback создай функцию один раз при первом рендере и если вдруг будет еще перерисовки то тогда не создавай
    dispatch(setCategoryId(id));
  },[]);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    //17 №1 добавили async теперь стрелочная функция стала асинхронным

    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? '↓' : '↑';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    // fetch(
    //   `https://6433e582582420e2316e5607.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    // )
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     setItems(json);
    //     setIsLoading(false);
    //   });

    // await axios //17 №2 добавили await. дождись выполнения этого запроса, потом уже дальше идешь
    //   .get(
    //     `https://6433e582582420e2316e5607.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    //   )
    //   .then((res) => {
    //     setItems(res.data);
    //     setIsLoading(false);
    //   });

    // try {
    // //17 №4 try\catch\finally отлавливаем ошибки
    // const res = await axios.get(
    //   //17 №3 С помощью async\await сократим код выше
    //   `https://6433e582582420e2316e5607.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    // );
    dispatch(
      //@ts-ignore
      fetchPizzas({
        //17 мы передаем в Redux, setItems из PizzaSlice. ТУТ уже не так
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );

    // } catch (error) {
    //   console.log('ERROR', error);
    //   alert('Ошибка при получении пицц');
    // } finally {
    //   setIsLoading(false);
    // }

    window.scrollTo(0, 0);
  };

  //15 Если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
  React.useEffect(() => {
    getPizzas();
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));

  //     const sort = listType.find(
  //       (obj) => obj.sortProperty === params.sortProperty,
  //     );

  //     dispatch(setFilters({ ...params, sort }));
  //     isSearch.current = true;
  //   }
  // }, []);

  //15 Если изменили параметры и был первый рендер
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });

  //     navigate(`?${queryString}`);
  //   }

  //   isMounted.current = true;
  // }, [categoryId, searchValue, currentPage]);

  //15 Если был первый рендер, то запрашиваем пиццы
  // React.useEffect(() => {
  //   window.scrollTo(0, 0);

  //   if (!isSearch.current) {
  //     fetchPizzas();
  //   }

  //   isSearch.current = false;
  }, [categoryId, searchValue, currentPage, sortType]);

  const pizzas = items.map((obj: any) => (
  //  <Link key={obj.id} to={`/pizza/${obj.id}`}> // 24перенесли в отдельную часть вPizzaBlock где верстка
      <PizzaBlock key={obj.id} {...obj} />
   //</Link>
  )); //19 добавили Link, чтоб useParams работал
  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  //17 смотри ниже где status === 'loading'
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>Повторите попытку еще раз!</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
