import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

// establish connection
const mongo_uri = process.env.MONGO_URI
mongoose.connect(mongo_uri);

// connection messages
mongoose.connection
.on('open',()=>console.log('database connected'))
.on('close',()=>console.log('database dis-connected'))
.on('error', (error)=>console.error(`mongo db encountered the following error: ${error}`))

//close connection
mongoose.connection.close();