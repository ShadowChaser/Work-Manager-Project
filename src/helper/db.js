import mongoose from "mongoose";
const config={
    isConnected:0
}

export const connectDb =async()=>{
    if(config.isConnected){
        return;
    }
    try{
        const {connection}=await mongoose.connect(process.env.MONGO_DB_URI,{
            dbName:'WORK-MANAGER'
        });
        console.log("DB Connected...");
        config.isConnected=connection.readyState;
    }catch(error){
        console.log("failed to connect twith database");
        console.log(error);
    }
}