import { connect } from "mongoose";

const uri = 'mongodb://localhost:27017/newUdemyDb';
// const uri = 'mongodb://127.0.0.1:27017/newUdemyDb';

connect(uri).then(()=>{
    console.log("Db connected successfully");
}).catch((err)=>{
    console.log("Db connection error:",err.message);
})