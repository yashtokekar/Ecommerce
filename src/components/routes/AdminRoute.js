import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { LoadingToRedirect } from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";

export const AdminRoute = ({children, ...rest }) => {
    const {user} = useSelector((state) => ({ ...state }));
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if(user && user.token) {
            currentAdmin(user.token)
            .then((res) => {
                console.log("CURRENT ADMIN RES", res);
                setOk(true);
            })
            .catch((err) => {
                console.log("ADMIN ROUTE ERR", err);
                setOk(false);
            })
        }
    }, [user]);

    return ok ? (
        <Route {...rest} />
    ) : (
        <div className="container">
            <LoadingToRedirect />
            <Spin size="large" style={{marginLeft: "50%", marginTop: "5%"}} />
        </div>
    );
}