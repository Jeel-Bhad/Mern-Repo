import { model, Schema } from "mongoose";
import { hash , compare , genSalt } from "bcrypt";

interface UserDocument extends Document {
    name:string;
    email:string;
    password:string
}

interface Methods {
    comaprePassword(password:string) : Promise<boolean>
}

const userScheme= new Schema <UserDocument , {} , Methods>({
    email:{
        type:String,
        unique:true,
        required:true
    },password:{
        type:String,
        required:true
    },name:{
        type:String,
        required:true
    }
},{timestamps:true});

//fire this before we going to save the user
userScheme.pre('save',async function(next){
    if(this.isModified('password')){
        const salt= await genSalt(10);
        this.password=await hash(this.password,salt)
    }
    next();
});

//comparing plain text and hash value
userScheme.methods.comaprePassword=async function(password){
    return await compare(password,this.password)
}
const UserModel= model("User",userScheme);
export default UserModel;