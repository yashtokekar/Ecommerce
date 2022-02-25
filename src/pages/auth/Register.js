import React, { useState } from 'react';
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { sendSignInLinkToEmail } from 'firebase/auth';

export const Register = () => {
  const [email,setEmail] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await sendSignInLinkToEmail(auth,email,config);

    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration`
    );

    window.localStorage.setItem("emailForRegistration", email);

    setEmail('');
  }
  const registerForm = () => (
    <form onSubmit={onSubmit}>
      <input type="email" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} autoFocus />
      <br />
      <button className='btn btn-raised' type='submit'>Register</button>
    </form>
  ) 

  return (

      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4>Register</h4>
            {registerForm()}
          </div>
        </div>
      </div>
  )
};