"use client";
import React from 'react'

const Footer = () => {
  return (
    <footer className='h-40 bg-blue-600 mt-5 text-white '>
        <div className='flex p-5 justify-around'>
            <div className='text-center flex flex-col justify-center'>
                <h1 className='text-3xl3'>Welcome to work manager</h1>
                <p>Lorem ipsum dolor sit .</p>
            </div>
            <div className='text-center' >
                <h1>Important Links</h1>
                <ul className='flex flex-col'>
                    <l1>
                        <a href="#!">Facebook</a>
                    </l1>
                    <l1>
                        <a href="#!">LinkedIn</a>
                    </l1>
                    <l1>
                        <a href="#!">Instagram</a>
                    </l1>
                </ul>
            </div>
        </div>
    </footer>
  )
}

export default Footer;
