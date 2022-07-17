import React, { useEffect, useState } from 'react';
import { Menu, Badge } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Search } from '../forms/Search';

const { SubMenu, Item } = Menu;

export const Header = () => {
  const [current, setCurrent] = useState('shop');
  let dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    getCurrent();
  }, [current]);

  const getCurrent = () => {
    let curr = 'shop';
    if (history.location.pathname === '/') {
      curr = 'home';
    } else if (history.location.pathname === '/cart') {
      curr = 'cart';
    }
    setCurrent(curr);
  };

  let { user, cart } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    //empty cart
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        localStorage.removeItem('cart');
      }
    }
    dispatch({
      type: 'ADD_TO_CART',
      payload: [],
    });
    history.push('/login');
  };

  return (
    <nav className='navbar-fixed-top'>
      <div>
        <Menu
          onClick={handleClick}
          selectedKeys={[current]}
          mode='horizontal'
          className='navbar-fixed-top'
        >
          <Item key='home' icon={<AppstoreOutlined />}>
            <Link to='/'>Home</Link>
          </Item>

          <Item key='shop' icon={<ShoppingOutlined />}>
            <Link to='/shop'>Shop</Link>
          </Item>

          <Item key='cart' icon={<ShoppingCartOutlined />}>
            <Link to='/cart'>
              <Badge count={cart.length} offset={[9, 0]}>
                Cart
              </Badge>
            </Link>
          </Item>

          {!user && (
            <Item
              key='register'
              icon={<UserAddOutlined />}
              className='float-right'
            >
              <Link to='/register'>Register</Link>
            </Item>
          )}

          {!user && (
            <Item key='login' icon={<UserOutlined />} className='float-right'>
              <Link to='/login'>Login</Link>
            </Item>
          )}

          {user && (
            <SubMenu
              key='SubMenu'
              icon={<SettingOutlined />}
              title={user.email && user.email.split('@')[0]} // split: name@email => ['name','email']
              className='float-right'
            >
              {user && user.role === 'subscriber' && (
                <Item>
                  <Link to='/user/history'>Dashboard</Link>
                </Item>
              )}

              {user && user.role === 'admin' && (
                <Item>
                  <Link to='/admin/dashboard'>Dashboard</Link>
                </Item>
              )}
              <Item icon={<LogoutOutlined />} onClick={logout}>
                Logout
              </Item>
            </SubMenu>
          )}

          <span key='search' className='float-right p-1'>
            <Search />
          </span>
        </Menu>
      </div>
    </nav>
  );
};
