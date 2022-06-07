import React, { useState, useEffect } from 'react';
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Spin } from 'antd';
import { useSelector } from 'react-redux';

export const ForgotPassword = ({history}) => {
    const [email,setEmail] = useState('');
    const [loading,setLoading] = useState(false);
    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        if(user && user.token) history.push("/");
    },[user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true,
        };

        await auth.sendPasswordResetEmail(email,config)
        .then(() => {
            setEmail("");
            setLoading(false);
            toast.success(`Password reset link has been sent to ${email}`);
        })
        .catch((err) => {
            setLoading(false);
            toast.error(err.message);
        })
    }

    return (
        <div className='container col-md-6 offset-md-3 p-5'>
            {!loading ? (<h4>Forgot Password</h4>) : (<Spin size="large" />)}

            {!loading && <form onSubmit={handleSubmit}>
                <input 
                  type="email" 
                  className="form-control" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  autoFocus 
                />
                <br />
                <button className='btn btn-raised' disabled={!email}>Submit</button>
            </form>}
        </div>
    );
};
