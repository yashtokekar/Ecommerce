import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { LoadingToRedirect } from "./LoadingToRedirect";

export const UserRoute = ({children, ...rest }) => {
    const {user} = useSelector((state) => ({ ...state }));

    return user && user.token ? (
        <Route {...rest} />
    ) : (
        <div className="container">
            <LoadingToRedirect />
            <Spin size="large" style={{marginLeft: "50%", marginTop: "5%"}} />
        </div>
    );
}