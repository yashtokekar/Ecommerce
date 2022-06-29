import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Search } from '../forms/Search';

const { SubMenu } = Menu;

export const Header = () => {
  const [current, setCurrent] = useState('home');
  let dispatch = useDispatch();
  let history = useHistory();

  let { user } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
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
          <Menu.Item key='home' icon={<AppstoreOutlined />}>
            <Link to='/'>Home</Link>
          </Menu.Item>

          <Menu.Item key='shop' icon={<ShoppingOutlined />}>
            <Link to='/shop'>Shop</Link>
          </Menu.Item>

          {!user && (
            <Menu.Item
              key='register'
              icon={<UserAddOutlined />}
              className='float-right'
            >
              <Link to='/register'>Register</Link>
            </Menu.Item>
          )}

          {!user && (
            <Menu.Item
              key='login'
              icon={<UserOutlined />}
              className='float-right'
            >
              <Link to='/login'>Login</Link>
            </Menu.Item>
          )}

          {user && (
            <SubMenu
              key='SubMenu'
              icon={<SettingOutlined />}
              title={user.email && user.email.split('@')[0]} // split: name@email => ['name','email']
              className='float-right'
            >
              {user && user.role === 'subscriber' && (
                <Menu.Item>
                  <Link to='/user/history'>Dashboard</Link>
                </Menu.Item>
              )}

              {user && user.role === 'admin' && (
                <Menu.Item>
                  <Link to='/admin/dashboard'>Dashboard</Link>
                </Menu.Item>
              )}
              <Menu.Item icon={<LogoutOutlined />} onClick={logout}>
                Logout
              </Menu.Item>
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
