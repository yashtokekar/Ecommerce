import React, { useState, useEffect } from 'react';
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import {  signInWithEmailLink, updatePassword } from 'firebase/auth';

export const RegisterComplete = ({ history }) => {
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
      setEmail(window.localStorage.getItem('emailForRegistration'))
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    //validation
    if(!email || !password){
        toast.error('Email and Password are required');
        return;
    }
    
    if(password.length < 6){
        toast.error('Password must have atleast 6 characters');
        return;
    }

    try {
        const result = await signInWithEmailLink(auth, email, window.location.href);
        if(result.user.emailVerified){
            //remove user from local storage
            window.localStorage.removeItem('emailForRegistration');

            //get user id token
            let user = auth.currentUser;
            await updatePassword(user, password);
            const idTokenResult = await user.getIdTokenResult();

            //redux store
            

            //redirect
            history.push('/');
        }
    } catch (error) {
        toast.error(error.message);
    }
  }
  const completeRegistrationForm = () => (
    <form onSubmit={onSubmit}>
      <input type="email" className='form-control' value={email} disabled />
      <br />
      <input type="password" className='form-control' value={password} onChange= {(e) => setPassword(e.target.value)} placeholder= "Password" autoFocus />
      <br />
      <button className='btn btn-raised' type='submit'>Complete Registration</button>
    </form>
  ) 

  return (

      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4>Complete Registration</h4>
            {completeRegistrationForm()}
          </div>
        </div>
      </div>
  )
};