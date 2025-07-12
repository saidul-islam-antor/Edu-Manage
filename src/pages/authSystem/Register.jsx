import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import SocailLogin from '../shared/socalLogin';
import loginImg from '../../assets/loginImg.jpg';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser } = useContext(AuthContext);

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result);
        // You can redirect or show success here
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="p-12 bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1 mx-auto">
          <img
            src={loginImg}
            className="w-full h-full rounded-lg shadow-2xl"
            alt="Register illustration"
          />
        </div>
        <div className="flex-1">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <h1 className="text-5xl font-bold">Register Now!</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">

                  {/* Name field */}
                  <label className="label">Name</label>
                  <input
                    type="text"
                    {...register('name', { required: true })}
                    className="input"
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <p className="text-red-500">Name is required</p>
                  )}

                  {/* PhotoURL field */}
                  <label className="label">Photo URL</label>
                  <input
                    type="text"
                    {...register('photoURL', { required: true })}
                    className="input"
                    placeholder="Enter your photo URL"
                  />
                  {errors.photoURL && (
                    <p className="text-red-500">Photo URL is required</p>
                  )}

                  {/* Email field */}
                  <label className="label">Email</label>
                  <input
                    type="email"
                    {...register('email', { required: true })}
                    className="input"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500">Email is required</p>
                  )}

                  {/* Password field */}
                  <label className="label">Password</label>
                  <input
                    type="password"
                    {...register('password', {
                      required: true,
                      minLength: 6,
                    })}
                    className="input"
                    placeholder="Enter your password"
                  />
                  {errors.password?.type === 'required' && (
                    <p className="text-red-500">Password is required</p>
                  )}
                  {errors.password?.type === 'minLength' && (
                    <p className="text-red-500">
                      Password must be at least 6 characters
                    </p>
                  )}

                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>

                  <button className="btn text-black btn-primary mt-4">
                    Register
                  </button>

                  <p className="font-semibold text-center pt-5">
                    Already have an account?{' '}
                    <Link className="text-secondary" to="/login">
                      Login
                    </Link>
                  </p>

                  <SocailLogin />
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
