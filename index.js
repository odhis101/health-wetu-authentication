import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import dotenv from 'dotenv';
import fileupload from 'express-fileupload';
import Users from './routes/User.js';

const app = express();
dotenv.config();
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors());
app.use(fileupload());

app.use('/users',Users)


const CONNECTION_URL = 'mongodb+srv://odhis101:natasha12@cluster0.r1d9hq1.mongodb.net/healthwetu?retryWrites=true&w=majority'

const PORT = process.env.PORT || 8080;
mongoose.set('strictQuery', true);
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>console.log(`Server running on port: ${PORT}`)))
.catch((error)=>console.log(error.message));

