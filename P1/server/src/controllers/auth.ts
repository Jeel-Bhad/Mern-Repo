import { RequestHandler } from "express";
import UserModel from "src/models/user";
import crypto from 'crypto' ;
import nodemailer from 'nodemailer' ;
import AuthverificationModel from "src/models/authVerificationToken";
import { sendErrorRes } from "src/utils/helper";

export const createNewUser:RequestHandler = async (req,res) =>{
         
    //read incoming data
    const {name,password,email} = req.body;

    //valid if data is ok or not and send error if not
    // if(!name) return sendErrorRes(res,"Name is missing",422);
    // if(!password) return  sendErrorRes(res,"Email is missing",422);
    // if(!email) return  sendErrorRes(res,"Password is missing",422);

    //check if already have ac with same user
    const existingUSer = await UserModel.findOne({email});
    if(existingUSer) return  sendErrorRes(res,"Email is already used",401);

    //this will create user entry inside the db
    const user = await UserModel.create({name,email,password})
    // user.comparePassword
    //generate token
    const token = crypto.randomBytes(36).toString('hex');
    console.log("token=="+token);
    await AuthverificationModel.create({owner:user._id,token})
    const link = `http://localhost:8000/verify/id=${user._id}&token=${token}`;

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "2d281b0c58da56",
          pass: "7f92c88e5d1cca"
        }
      });

    await transport.sendMail({
        from:"verification@myapp.com",
        to:user.email,
        html:`<h1>Please click on <a href="${link}">this link</a> to verify your account.</h1>`
    })

    res.json({link:link,message:"please check your inbox",username:name,email:email,token:token,password:password})
   }