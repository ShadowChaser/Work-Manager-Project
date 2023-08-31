"use client";
import UserContext from '@/context/userContext';
import { deleteTask, getTaskOfUser } from '@/services/taskService';
import React, { useContext, useEffect, useState } from 'react'
import Task from './Task';
import { toast } from 'react-toastify';
import { Vortex } from 'react-loader-spinner';

function ShowTasks() {
    const [tasks,setTasks]=useState([]);
    const [loading,setLoading]=useState(false);
    const context=useContext(UserContext);
    async function loadTasks(userId){
        setLoading(true);
        try {
            const tasks=await getTaskOfUser(userId);
            setTasks([...tasks].reverse());
            console.log(tasks);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    async function deleteTaskParent(taskId){
        setLoading(true);
        try {
            const result=await deleteTask(taskId);
            const newTasks=tasks.filter(item=>item._id!=taskId)
            setTasks(newTasks);
            toast.success("Your task is deleted");
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("error in deleting task")
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(context.user){
            loadTasks(context.user._id);
        }
        
    },[context.user]);
  return (
    <>
    {loading?<div className='mt-4 flex justify-center'>
    <Vortex
  visible={true}
  height="180"
  width="180"
  ariaLabel="vortex-loading"
  wrapperStyle={{}}
  wrapperClass="vortex-wrapper"
  colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
/>
  </div>:<div className='grid grid-cols-12 mt-3'>
      <div className='col-span-6 col-start-4'>
        <h1 className='text-3xl mb-3'>Your tasks ({tasks.length})</h1>
        {
            tasks.map((task)=>(
                <Task task={task} key={task._id} deleteTaskParent={deleteTaskParent}/>
            ))
        }
      </div>
    </div>}
    
    </>
  )
}

export default ShowTasks;
