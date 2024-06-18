import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { userSelectors } from '../../services/slices/user';
import { useNavigate } from 'react-router-dom';
import { burgerConstructorActions } from '../../services/slices/burgerConstructor';
import { RequestStatus } from '@utils-types';
import { orderBurger } from '../../services/slices/burgerConstructor';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch = useDispatch();
  const checkUserAuth = useSelector(userSelectors.getAuthChecked);
  const constructorItems = useSelector((state) => state.burgerConstructor);
  const navigate = useNavigate();

  const orderRequest =
    useSelector((state) => state.burgerConstructor.status) ===
    RequestStatus.Loading;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!checkUserAuth) {
      navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;
    const dataOrder = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];
    dispatch(orderBurger(dataOrder));
  };

  const closeOrderModal = () => {
    dispatch(burgerConstructorActions.clear());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  //return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
