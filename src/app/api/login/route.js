import { User } from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDb } from "@/helper/db";

export async function POST(request){
    const {email,password}=await request.json();
    try {
        await connectDb();
        const user=await User.findOne({
            email:email
        });
        //find user

        if(user===null){
            throw new Error("User not found")
        }
        // Match Password
        const matched=bcrypt.compareSync(password,user.password);
        if(!matched){
            throw new Error("Password not matched")
        }

        // Generate Token

       const token=jwt.sign({
            _id:user._id,
            name:user.name
        },process.env.JWT_KEY)
        
        //Create Next reponse cookie

       const response= NextResponse.json({
            message:"Login Success!!",
            success:true,
            user:user
        })

        response.cookies.set("authToken",token,
        {
            expiresIn:"1d",
            httpOnly:true
        }
        )
        return response;
    } catch (error) {
        return NextResponse.json({
            message:error.message,
            success:false
        },{
            status:500
        })
    }
}