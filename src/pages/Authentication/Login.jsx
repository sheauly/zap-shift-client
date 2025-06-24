import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import SocialLogin from '../SocialLogin';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSumbmit = data => {
        console.log(data);
    }
    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <h1 className="text-3xl text-center font-bold mt-5">Login Now!</h1>
            <div className='card-body'>
                <form onSubmit={handleSubmit(onSumbmit)}>
                    <fieldset className="fieldset">
                        <label className="label">Email</label>
                        <input type="email" {...register('email')} className="input" placeholder="Email" />

                        <label className="label">Password</label>
                        <input type="password" {...register('password',
                            {
                                required: true, minLength: 6

                            })} className="input" placeholder="Password" />

                        {
                            errors.password?.type === "required" && (<p className='text-red-500'>password in required</p>)
                        }
                        {
                            errors.password?.type === "minLength" && (<p className='text-red-500'>password Must be characters or longer</p>)
                        }

                        <div><a className="link link-hover">Forgot password?</a></div>

                    </fieldset>
                    <button className="btn btn-neutral w-full mt-4">Login</button>
                    <p><small>New to this website?<Link to="/register" className="btn btn-link">Register</Link></small></p>
                </form>
                <SocialLogin></SocialLogin>
           </div>
     </div>
         
     
    );
};

export default Login;