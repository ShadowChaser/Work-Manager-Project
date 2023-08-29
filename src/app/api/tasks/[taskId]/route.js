//api/tasks/{taskId}

import { getResponseMessage } from "@/helper/responseMessage";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";
import { connectDb } from "@/helper/db";



export async function GET(request,{params}){
    const {taskId}=params;
    try {
        await connectDb();
        const task=await Task.findById(taskId);
       
        return NextResponse.json(task);
    } catch (error) {
        console.log(error);
        return getResponseMessage("Error in getting Task !!",404,false);
    }
}

export async function PUT(request,{params}){
    const {taskId}=params;
    try {
        const {title,content,status}=await request.json();
        await connectDb();
        let task=await Task.findById(taskId);
        if(title)
            task.title=title;
        if(content)
            task.content=content;
        if(status)
            task.status=status;
        
        const updatedTask=await task.save();
        return NextResponse.json(updatedTask);
    } catch (error) {
        console.log(error);
        return getResponseMessage("Failed to Update !!",404,false);
    }
}

export async function DELETE(request,{params}){
    const {taskId}=params;
    try {
        await connectDb();
        await Task.deleteOne({
            _id: taskId,
        })

        return getResponseMessage("Task Deleted !!",200,true);
    } catch (error) {
        console.log(error)
        return getResponseMessage("Failed to Delete Task !!",500,false);
    }
}