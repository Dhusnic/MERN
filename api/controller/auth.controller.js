import User from "../models/user.model.js";
//to encrypt the password for database
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt  from "jsonwebtoken";



export const signup=async(req,res,next)=>{
    const{username,email,password}=req.body;
    const hashedPassword=bcryptjs.hashSync(password,10);
    const newUser=new User({username,email,password:hashedPassword});
    try{

        await newUser.save()
        res.status(201).json({message:"User created successfully"});
    }
    catch(error)
    {
        // next(error);
        //After using utils File;
        next(errorHandler(300,"Something Went Wrong!"));
    }
}; 

export const signin=async(req,res,next)=>
{
    const{email,password}=req.body;
    try
    {
        const validUser=await User.findOne({email});//to get the details of the email
        if(!validUser) return next(errorHandler(401,"Invalid credentials")); //check and print whether the email is present or not
        const validPassword=bcryptjs.compareSync(password,validUser.password); //to get the hashed pass check with given password
        if(!validPassword) return next(errorHandler(401,"wrong credentials"));
        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET); //to create a auth token using jwt
        const {password:hashedPassword,...rest}=validUser._doc; // remove password from user and get remaining info to give it to client side
        const expiryDate=new Date(Date.now()+3600000*10);
        res
        .cookie('access_token',token,{httpOnly:true,expires:expiryDate})
        .status(200)
        .json(rest);
    }
    catch(error)
    {
        next(error);
    }
}