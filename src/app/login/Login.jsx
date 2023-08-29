"use client";
import UserContext from '@/context/userContext';
import { login } from '@/services/userService';
import { useRouter } from 'next/navigation';
import React,{useContext, useState} from 'react'
import { toast } from 'react-toastify';

const Login = () => {
  const router=useRouter();
  const context=useContext(UserContext);
    const [data,setData]=useState({
        email:"",
        password:""
      });
    
    const loginFormSubmitted=async(event)=>{
        event.preventDefault();
        if(data.email.trim()==='' || data.email==null){
            toast.warning("Invalid Email",{
              position:"top-center"
            });
            return;
          }
          
          if(data.password.trim()==='' || data.password==null){
            toast.warning("Invalid Password",{
              position:"top-center"
            });
            return;
          }
      //VALID DATA LOGIN

      try { 
        const result=await login(data);
        toast.success("Logged In");
        //redirect
        context.setUser(result.user);
        router.push("/profile/user");
      } catch (error) {
          console.log(error);
          toast.error(error.response.data.message,{
            position:"top-center"
          })
      }

    }

  return (
    <div className='grid grid-cols-12'>
        <div className='col-span-4 col-start-5'>
            <div className='py-5'>
            <h1 className='text-3xl text-center'>Login Here</h1>
            <form action='#!' onSubmit={loginFormSubmitted}>
                {/* Email Field */}
                <div className="mt-3">
                  <label htmlFor="user_email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input type='email' 
                   className='w-full p-3 rounded-lg bg-gray-800 focus:ring-gray-400 border border-gray-800 ps-3'
                   placeholder='Enter Email'
                   id="user_email"
                   name="user_email"
                   onChange={event=>{
                    setData({
                      ...data,
                      email:event.target.value
                    })
                   }}
                   value={data.email}
                   />
                </div>
                {/* Password Field */}
                <div className="mt-3">
                  <label htmlFor="user_passowrd" className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <input type='password' 
                   className='w-full p-3 rounded-lg bg-gray-800 focus:ring-gray-400 border border-gray-800 ps-3'
                   placeholder='Enter Password'
                   id="user_passowrd"
                   name="user_password"
                   onChange={event=>{
                    setData({
                      ...data,
                      password:event.target.value
                    })
                   }}
                   value={data.password}
                   />
                </div>

                <div className='m-3 text-center'>
                    <button type="submit" className='px-3 py-2 bg-green-600 rounded hover:bg-green-400'>Login</button>
                    <button type='button' className='px-3 py-2 bg-orange-600 rounded ms-3 hover:bg-orange-400'>Reset</button>
                </div>
            </form>
            </div>
        </div>
    </div>
  )
}

export default Login
