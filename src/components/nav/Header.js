import React, {useState} from "react";
import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined, UserOutlined, UserAddOutlined, LogoutOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";


const { SubMenu } = Menu;


export const Header = () => {
    const [current,setCurrent] = useState("home");
    let dispatch = useDispatch();
    let history = useHistory();

    const handleClick = (e) => {
        setCurrent(e.key)
    };

    const logout = () => {
      firebase.auth().signOut();
      dispatch({
        type: "LOGOUT",
        payload: null
      });
    };

    history.push("/login");

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home" icon={<AppstoreOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="register" icon={<UserAddOutlined />} className="float-right">
        <Link to="/register">Register</Link>
        </Menu.Item>
        <Menu.Item key="login" icon={<UserOutlined />} className="float-right">
        <Link to="/login">Login</Link>
        </Menu.Item>
        <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Username">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
            <Menu.Item icon={<LogoutOutlined />} onClick={logout}>Logout</Menu.Item>
        </SubMenu>
      </Menu>
    );
};
