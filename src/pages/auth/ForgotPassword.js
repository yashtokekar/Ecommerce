import React, { useState, useEffect } from 'react';
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Spin } from 'antd';
import { useSelector } from 'react-redux';

export const ForgotPassword = ({history}) => {
    const [email,setEmail] = useState('');
    const [loading,setLoading] = useState(false);

    const handleSubmit = () => {
        //
    }

    return (
        <div className='container col-md-6 offset-md-3 p-5'>
            {!loading ? (<h4>Forgot Password</h4>) : (<Spin size="large" />)}

            <form onSubmit={handleSubmit}>
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
            </form>
        </div>
    );
};
