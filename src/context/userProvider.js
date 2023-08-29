"use client"
import React, { useEffect, useState } from "react";
import UserContext from "./userContext";
import { toast } from "react-toastify";
import { httpAxios } from "@/helper/httpHelper";
import { currentUser } from "@/services/userService";

const UserProvider=({children})=>{
    const[user,setUser]=useState(undefined);
    useEffect(()=>{
        async function load(){
            try {
                const tempUser=await currentUser();
                setUser({...tempUser});
                console.log(tempUser)
            } catch (error) {
                console.log(error);
                setUser(undefined);
                // toast.error("error in loading current user")
            }
        }
        load()
    },[])
    

    return <UserContext.Provider value={{user,setUser}}>
        {children}
        </UserContext.Provider>
}

export default UserProvider