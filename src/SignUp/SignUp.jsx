import React, { useContext, useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../components/Providers/AuthProviders';

const SignUp = () => {
    const [error, setError] = useState('');
    const { createUser } = useContext(AuthContext)

    const handleSignUp = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password, confirm)

        setError('')

        if (password !== confirm) {
            setError('Your Password did not match');
            return
        }
        else if (password.length < 6) {
            setError('Password must be 6 characters or longer')
            return
        }

        createUser(email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            form.reset()
        })
        .catch(error => {
            console.log(error);
            setError(error.message)
        })
    }

    return (
        <div className='form-container2'>
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' required /> <br />
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' required />
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" name='confirm' required />
                </div>
                <div>
                    <input className='btn-submit' type="submit" value="Sign Up" />
                </div>
                <div className='short-msg'>
                    <p className='text-error'>{error}</p>
                    <p><small>Already have an Account?</small> <Link to="/login">Login</Link></p>
                </div>

            </form>
        </div>
    );
};

export default SignUp;