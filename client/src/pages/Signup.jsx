import React, { useState } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
export default function Signup() {
  const [formData,setFormData]=useState({});
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value});
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setloading(true);
    const res=await fetch('/api/auth/signup',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData),
    });
    const data=await res.json();
    console.log(data);
    setloading(false);
    if (data.success==false) {
      seterror(true);
      return;
    }
    navigate("/signin");
  
    
  };
  console.log(formData);
  return (
    <>
      
    <Header />
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <input type="email" placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <input type="password" placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange}/>
        <button disabled={loading}className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' >{loading ?'loading':'Sign Up'}</button>
      </form>
      <div className='flex gap-2'>
        <p>Have an account?</p>
        <Link to={"/signin"}>
          <span className='text-blue-500'>Sign In</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something Went Wrong'}</p>
    </div>
    </>
    
  )
}
