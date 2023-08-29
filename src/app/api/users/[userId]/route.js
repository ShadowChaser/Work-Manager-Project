import { NextResponse } from "next/server";
import { connectDb } from "@/helper/db";
import { User } from "@/models/user";



export const GET=async (request,{params})=>{
    const {userId}=params;

        try {
            await connectDb();
            const user=await User.findById(userId).select("-password");
            return NextResponse.json(user);
        } catch (error) {
            return NextResponse.json({
                message:"Error in getting User !!!",
                success:false
            })
        }
   

    
}

//delete user
export async function DELETE(request,{params}){
    const {userId}=params;
    try {
        await connectDb();
        await User.deleteOne({
            _id: userId,
        })

        return NextResponse.json({
            message:"User deleted !!!",
            success:true
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message:"Error in deleting !!!",
            success:false
        })
    }
}


//Update User
export async function PUT(request,{params}){
    const {userId}=params;

    const {name,password,about,profileURL}=await request.json();

    try {
        await connectDb();
        const user=await User.findById(userId);
        if(name)
            user.name=name;
        if(about)
            user.about=about;
        if(password)
            user.password=password;
        if(profileURL)
            user.profileURL=profileURL;
        const updatedUser=await user.save();

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message:"Failed to update user !!!",
            success:false
        })
    }
}