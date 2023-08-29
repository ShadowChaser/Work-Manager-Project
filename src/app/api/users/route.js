import { NextResponse } from "next/server";
import { User } from "@/models/user";
import { connectDb } from "@/helper/db";
import bcrypt from "bcrypt";



export async function GET(request){

let users=[];
try {
    await connectDb();
    users=await User.find().select("-password");
} catch (error) {
    console.log(error);
    return NextResponse.json({
        message:"failed to get users",
        success:false
    },{
        status:500
    })
}

return NextResponse.json(users);
}

//Create USER
export async function POST(request){
    //fetch User detail from request
   
    const{name,email,password,about,profileURL}=await request.json();

    //create user Object with user model
   
    const user=new User({
        name,email,password,about,profileURL
    });

    

    try{
        //save the object to database
        user.password=await bcrypt.hash(user.password,parseInt(process.env.BCRYPT_SALT));
        await connectDb();
        const createdUser=await user.save();
        
        const response=NextResponse.json(user,{
            status:201,
        })

        return response;

    }catch(error){
        console.log(error);
        return NextResponse.json({
            message:"Failed to create User !!",
            status:false
        },{
            status:500
        })
    }
    
}
