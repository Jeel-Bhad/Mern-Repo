
import 'express-async-errors';
import express, { RequestHandler } from 'express';
import authRouter from './routes/auth';
import './db';

const app = express();
//middleware
// const bodyParser : RequestHandler = (req,res,next)=>{
//     //to get front-end  post data over here
//     req.on('data',(chunk)=>{
//        req.body = JSON.parse(chunk);
//        next(); // move pointer inside post block
//     });
// };

//use middleware for entrie application
//app.use(bodyParser);

//express provide middleware by default (built-in) for entrie application
app.use(express.json());

//middleware will use while taking data from form for entrie application
app.use(express.urlencoded({extended:false}));

//API Routes
app.use("/auth",authRouter)

app.use(function(err,req,res,next){
    res.status(500).json({message:err.message})
} as express.ErrorRequestHandler)

//use postman
app.get("/",(req,res)=>{
    //response after hitting get api
    res.json({message : 'Helokk'})
});

// "/" - replace this with name of api
app.post("/",(req,res)=>{
    console.log(req.body.name);
    res.json({message : 'Post method response like - login successfull'})
});

app.post("/create-product",(req,res)=>{
    //after hitting api from the postman this code will run
    console.log(req.body.name);
    res.json({message : 'Post method response like - create-product'})
});

//server
app.listen(8000,()=>{
    console.log("app is running on http://localhost:8000")
})