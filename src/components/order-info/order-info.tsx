import { FC, useMemo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { selectorIngredients } from '../../services/slices/ingredients';
import { useDispatch, useSelector } from '../../services/store';
import { getOrderByNumberApi } from '@api';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  /** TODO: взять переменные orderData и ingredients из стора */
  const [orderData, setOrderData] = useState<TOrder>();
  const ingredients: TIngredient[] = useSelector(
    (state) => state.ingredients.data
  );

  useEffect(() => {
    getOrderByNumberApi(Number(number)).then((res) => {
      setOrderData(res.orders[0]);
    });
  }, []);

  const dispatch = useDispatch();
  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
