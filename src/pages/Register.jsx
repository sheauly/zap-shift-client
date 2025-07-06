import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import SocialLogin from './SocialLogin';
import axios from 'axios';
import useAxiouse from './useAxiouse';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const [profilePic, setProfilePic] = useState('');
    const axiosInstance = useAxiouse();

    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(async (result) => {
                console.log(result.user);

                // update userinfo in the database
                const userinfo = {
                    email: data.email,
                    role: 'user',
                    created_id: new Date().toDateString(),
                    created_log_in: new Date().toDateString()
                }

                const userRes = await axiosInstance.post('/users', userinfo);
                console.log(userRes.data);
                // update user profile in firebase
                const userprofile = {
                    displayName: data.name,
                    photoUrl: profilePic

                }
                updateUserProfile(userprofile)
                    .then(() => {
                        console.log('profile name update');
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        console.log(image);
        const formData = new FormData();
        formData.append('image', image);

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`

        const res = await axios.post(imageUploadUrl, formData)

        setProfilePic(res.data.data.url);
    }


    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <h1 className="text-3xl text-center mt-3 font-bold">Create An Account!</h1>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        {/* name field */}
                        <label className="label">Your Name</label>
                        <input type="text" {...register('name',
                            { required: true })} className="input" placeholder="Your Name" />
                        {
                            errors.email?.type === "required" && <p
                                className='text-red-500'>Email is required</p>
                        }

                        {/* name field */}
                        <label className="label">Your File</label>
                        <input type="file"
                            onChange={handleImageUpload}
                            className="Your Profile" placeholder="Your Prifile picture" />


                        {/* email field */}
                        <label className="label">Email</label>
                        <input type="email" {...register('email',
                            { required: true })} className="input" placeholder="Email" />
                        {
                            errors.email?.type === "required" && <p
                                className='text-red-500'>Email is requirPed</p>
                        }
                        {/* password field */}
                        <label className="label">Password</label>
                        <input type="password" {...register('password',
                            { required: true, minLength: 6 })} className="input" placeholder="Password" />
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>password Must be characters or 6 longer</p>
                        }
                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-primary text-black mt-4">Register</button>
                    </fieldset>
                    <p><small>Already have an account ?<Link to="/login" className="btn btn-link">Login</Link></small></p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Register;