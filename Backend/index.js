import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/user.routes.js";

import  cookieParser from 'cookie-parser';


    
const app = express();
app.use(express.json());
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use(cookieParser());

const CONNECTION_URL='mongodb+srv://admin:admin@database.q56qr75.mongodb.net/UserDB?retryWrites=true&w=majority'


app.use("/api",router);

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(8000 ,()=>console.log('server running on prt')))
.catch((error)=>console.log(error.message));

