import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const navigate = useNavigate();
  const openFeed = () => {
    navigate('/feed');
  };
  const openProfile = () => {
    navigate('/profile');
  };
  const openMain = () => {
    navigate('/');
  };
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? styles.link_active : styles.link
            }
          >
            {({ isActive }) => (
              <>
                <BurgerIcon type={'primary'} />
                <p
                  className='text text_type_main-default ml-2 mr-10'
                  onClick={openMain}
                >
                  Конструктор
                </p>
              </>
            )}
          </NavLink>
          <NavLink
            to='/feed'
            className={({ isActive }) =>
              isActive ? styles.link_active : styles.link
            }
          >
            {({ isActive }) => (
              <>
                <ListIcon type={'primary'} />
                <p
                  className='text text_type_main-default ml-2'
                  onClick={openFeed}
                >
                  Лента заказов
                </p>
              </>
            )}
          </NavLink>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <div className={styles.link_position_last}>
          <NavLink
            to={userName ? '/profile' : '/login'}
            className={({ isActive }) =>
              isActive ? styles.link_active : styles.link
            }
          >
            {({ isActive }) => (
              <>
                <ProfileIcon type={'primary'} />
                <p
                  className='text text_type_main-default ml-2'
                  onClick={openProfile}
                >
                  {userName || 'Личный кабинет'}
                </p>
              </>
            )}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
