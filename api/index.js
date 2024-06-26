import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
dotenv.config()
mongoose.connect(process.env.MONGO).then(()=>{console.log("connected to MongoDB");}).catch((err)=>{console.log(err);})
const app=express();

app.use(express.json());

app.listen(3000,()=>{console.log('Server listening on port 3000')});


app.use("/api/user",userRoute);
app.use("/api/auth",authRoute);


app.use((err,req,res,next)=>{
    const errorStatus=err.errorStatus || 500;
    const errorMessage=err.message || 'Something went wrong!';
    return res.status(errorStatus).json({
        success:false,
        errorMessage,
        errorStatus,
    });
});