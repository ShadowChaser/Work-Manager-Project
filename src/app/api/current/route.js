import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/user";
import { connectDb } from "@/helper/db";



export async function GET(request){
    const authToken=request?request.cookies.get("authToken")?.value:null;
    

  let user=null;
   if (authToken) {
     const data=jwt.verify(authToken,process.env.JWT_KEY);
     await connectDb();
     const user=await User.findById(data._id).select('-password')
  }
   
    return NextResponse.json(user);
}