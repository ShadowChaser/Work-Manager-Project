"use client"
import React,{useState} from 'react';
import signUpBanner from "../../assets/signup.svg";
import Image from "next/image";
import { toast } from 'react-toastify';
import { signUp } from '@/services/userService';

const Signup = () => {
  const [data,setData]=useState({
    name:"",
    email:"",
    password:"",
    about:"",
    profileURL:"https://t3.ftcdn.net/jpg/00/64/67/52/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
  })

  const doSignup=async(event)=>{
      event.preventDefault();
      //Form Validation
      if(data.name.trim()==='' || data.name==null){
        toast.warning("Name is required",{
          position:"top-center"
        });
        return;
      }
      if(data.email.trim()==='' || data.email==null){
        toast.warning("Email is required",{
          position:"top-center"
        });
        return;
      }
      if(data.password.trim()==='' || data.password==null){
        toast.warning("Password is required",{
          position:"top-center"
        });
        return;
      }
      if(data.about.trim()==='' || data.about==null){
        toast.warning("About is required",{
          position:"top-center"
        });
        return;
      }
      if(data.profileURL.trim()==='' || data.profileURL==null){
        toast.warning("profileUrl is required",{
          position:"top-center"
        });
        return;
      }

      //Form Submit

      try {
        const result=await signUp(data);
        toast.success("User is Registered!!",{
          position:"top-center"
        });
        setData({
          name:"",
          email:"",
          password:"",
          about:"",
          profileURL:""
        })
      } catch (error) {
        console.log(error)
        toast.error("SignUp Error "+ error.response.data.message,{
          position:"top-center"
        });
      }
  }

  const resetForm=()=>{
    setData({
      name:"",
      email:"",
      password:"",
      about:"",
      profileURL:""
    })
  }

  return (
    <div className='grid grid-cols-12'>
        <div className='col-span-4 col-start-5'>
            <div className='py-5'>
            <div className="my-8 flex justify-center m-5">
            <Image src={signUpBanner} 
            alt="LoginBanerImage"
            style={{
              width:"50%",
            }}/>
          </div>
              <h1 className='text-3xl text-center'>Sign Up Here</h1>
              <form action='#!' className='mt-5' onSubmit={doSignup}>
                {/* Name Field */}
                <div className="mt-3">
                  <label htmlFor="user_name" className="block text-sm font-medium mb-2">
                    Username
                  </label>
                  <input type='text' 
                   className='w-full p-3 rounded-lg bg-gray-800 focus:ring-gray-400 border border-gray-800 ps-3'
                   placeholder='Enter Name'
                   name="user_name"
                   onChange={event=>{
                    setData({
                      ...data,
                      name:event.target.value
                    })
                   }}
                   value={data.name}
                   />
                </div>
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
                {/* about Field */}
                <div className="mt-3">
                  <label htmlFor="user_about" className="block text-sm font-medium mb-2">
                    About
                  </label>
                  <textarea 
                  type='text' 
                   className='w-full p-3 rounded-lg bg-gray-800 focus:ring-gray-400 border border-gray-800 ps-3'
                   placeholder='Enter About'
                   id="user_about"
                   rows={8}
                   name="user_about"
                   onChange={event=>{
                    setData({
                      ...data,
                      about:event.target.value
                    })
                   }}
                   value={data.about}
                   ></textarea>
                </div>
                <div className='m-3 text-center'>
                    <button type="submit" className='px-3 py-2 bg-green-600 rounded hover:bg-green-400'>SignUp</button>
                    <button onClick={resetForm} type='button' className='px-3 py-2 bg-orange-600 rounded ms-3 hover:bg-orange-400'>Reset</button>
                </div>
              </form>
            </div>
        </div>
    </div>
  )
}

export default Signup;
