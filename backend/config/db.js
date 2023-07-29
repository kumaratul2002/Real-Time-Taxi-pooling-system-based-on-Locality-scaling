import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const connectToMongo = 
mongoose.connect(process.env.DB).then(()=>{
  console.log("Connected to Mongo")
}).catch(()=>{
  console.log("Failed to connect")
})

