import { NextResponse } from "next/server";
import { connectDb } from "@/helper/db";

export async function POST(request){
    const response=NextResponse.json({
        message:"Logged out!!",
        success:true
    })

    response.cookies.set("authToken","",{
        expiresIn:new Date(0),
    })

    return response;
}