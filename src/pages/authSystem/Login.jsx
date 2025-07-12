import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import SocailLogin from '../shared/socalLogin';
import loginImg from '../../assets/loginImg.jpg'


const Login = () => {
    const {register,
        handleSubmit,
        formState:{errors},
    }=useForm()
    const onSubmit =data =>{
        console.log(data)
    }


    return (
    





<div className=" p-12 bg-base-200 ">
  <div className="hero-content flex-col lg:flex-row-reverse">
   <div className='flex-1 '>
     <img
      src={loginImg}
      className=" h-full w-full rounded-lg shadow-2xl"
    />
   </div>
    <div className='flex-1'>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <form onSubmit={handleSubmit(onSubmit)}> 
<fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email"
           {...register('email',
           )} className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" 
          {...register('password',
            {required:true,
           minLength:6}
          )}className="input" placeholder="Password" />
          {
          
          errors.password?.type ==='required'&& <p className='text-red-500'>password is required </p>
          
          }
          {
          
          errors.password?.type ==='minLength'&& <p className='text-red-500'>password Must be 6 characters  </p>
          
          }
          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-primary text-black mt-4">Login</button>
           <p className='font-semibold text-center pt-5'>Don't Have An Account ? <Link className='text-secondary' to={"/register"}> Register</Link></p>
          
        </fieldset>

        </form>
         <SocailLogin></SocailLogin>
      </div>
     
    </div>
  
    </div>
  </div>
</div>







    );
};

export default Login;