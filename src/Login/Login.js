import React from 'react'
import { useState } from 'react';
import { Link,useHistory } from 'react-router-dom'
import { auth } from '../firebase';
import './Login.css'

function Login() {

    const history = useHistory();
        const [email,setEmail] = useState('');
        const [password,setPassword] = useState('');

        const signIn = e =>{
            e.preventDefault();

            auth.signInWithEmailAndPassword(email,password)
            .then(auth => {
                history.push('/')
            })
            .catch(error => alert(error.message))
            //firebase setup

        }

        const register = e =>{
            e.preventDefault();

            //firebase

            auth.createUserWithEmailAndPassword(email,password)
            .then((auth)=> {
                //successfully created user
                console.log(auth);
                if(auth){
                    history.push('/')
                }
            })
            .catch(error => alert(error.message))

        }

    return (
        <div className='login'>
            <Link to='/'>
            <img className="login__logo" src="data:image/png;base64,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" alt="" />
            </Link>



            <div className="login__container">
                <h1>Sign-In</h1>
                <form action="">
                    <h5>E-mail</h5>
                    <input type="text" value={email}  onChange={e => setEmail(e.target.value)}/>
                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>

                    <button type='submit' onClick={signIn} className='login__signinbtn'>Sign In</button>
                </form>


                <p>
                    By signing-in you agree to AMAzon's Conditions of Use & Sale. Please see our Privacy Notice, our cookies notice and our Interest based ads notice
                </p>

                <button onClick={register} className='login__registerbtn'>Create your amazon account</button>
            </div>
        </div>
    )
}

export default Login
