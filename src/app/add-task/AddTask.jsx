"use client";
import loginSVG from "../../assets/login.svg";
import React,{useState,useEffect} from 'react';
import Image from "next/image";
import { addTask } from "@/services/taskService";
import { toast } from 'react-toastify';

const AddTask = () => {
  
  const [task,setTask]=useState({
    title:'',
    content:'',
    status:'none',
    userId:''
  });

  const handleAddTask=async()=>{
    event.preventDefault();
    //validate task data
    try {
      const result=await addTask(task);
      toast.success("Your task is added!!",{
        position:"top-center",
      })
      setTask({
        title:'',
        content:'',
        status:'none',
        userId:'64e96ba0e375cc67214a58aa'
      })
    } catch (error) {
      console.log(error);
      toast.error("Task not added !!",{
        position:"top-center",
      })
    }


  }

  return (
    <div className='grid grid-cols-12 justify-center'>
        <div className='col-span-4 col-start-5 p-5 shadow-sm'>
          <div className="my-8 flex justify-center">
            <Image src={loginSVG} 
            alt="LoginBanerImage"
            style={{
              width:"50%",
            }}/>
          </div>
          <h1 className='text-3xl text-center'>Add your task here</h1>
          <form action='#!' onSubmit={handleAddTask}>
            {/* Task Title */}
          <div className='mt-4'>
              <lable htmlFor="task_title" className="block text-sm font-medium mb-2">Title</lable>
              <input type="text" 
              className='w-full p-3 rounded-lg bg-gray-800 focus:ring-gray-400 border border-gray-800' 
              id="task_title"
              name="task_title"
              onChange={(event)=>{
                setTask({
                  ...task,
                  title:event.target.value
                });
              }}
              value={task.title}
              />
          </div>
            {/* Task Content */}
          <div className='mt-4'>
              <lable htmlFor="task_content" 
              className="block text-sm font-medium mb-2">
                Content
              </lable>
              <textarea type="text" 
              className='w-full p-3 rounded-lg bg-gray-800 focus:ring-gray-400 border border-gray-800' 
              id="task_content"
              rows={5}
              name="task_content"
              onChange={(event)=>{
                setTask({
                  ...task,
                  content:event.target.value
                });
              }}
              value={task.content}
              />
          </div>
          {/* Task Status */}
          <div className='mt-4 text-sm font-medium mb-2'>
          <lable htmlFor="task_status" 
              className="block">
                Status
              </lable>
              <select id="task_status" className='w-full p-3 rounded-lg bg-gray-800 focus:ring-gray-400 border border-gray-800'
              name="task_status"
              onChange={(event)=>{
                setTask({
                  ...task,
                  status:event.target.value
                });
              }}
              value={task.status}
              >
                <option value="none" disabled>---Select Status---</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
          </div>
          {/* button actions */}
          <div className='mt-4 flex justify-center'>
              <button className='bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800'>Add Task</button>
              <button className='bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800 ms-3'>Clear</button>
          </div>
          
        </form>
        </div>
    </div>
  )
}

export default AddTask;
