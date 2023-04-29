import React, { useContext } from 'react';
import './Login.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';

const Login = () => {

    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)

    const from = location.state?.from?.pathname || '/'

    const handleLogIn = () => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                form.reset()
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleLogIn}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' required /> <br />
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' required />
                </div>
                <div>
                    <input className='btn-submit' type="submit" value="Login" />
                </div>
                <div className='short-msg'>
                    <p><small>New to Ema-Jhon?</small> <Link to="/signup">Create new Account</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Login;