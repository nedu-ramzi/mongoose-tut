import dotenv from 'dotenv';
dotenv.config();
import mongoose, { Schema, model } from 'mongoose';

// establish connection
const mongo_uri = process.env.MONGO_URI
mongoose.connect(mongo_uri);

// connection messages
mongoose.connection
.on('open',()=>console.log('database connected'))
.on('close',()=>console.log('database dis-connected'))
.on('error', (error)=>console.error(`mongo db encountered the following error: ${error}`))

// create a Schema
const dogSchema = new mongoose.Schema({
    name: String,
    age: Number,
    tag: {
        type:Number,
        unique:true,
        required: true
    },
},{timestamps: true});

// create a model
const Dog = mongoose.model('Dog',dogSchema);

//run some query
mongoose.connection.on('open', async ()=>{
    const dog = await Dog.create({name:"Bingo", age:2, tag:1});

    console.log(dog);

//close connection
mongoose.connection.close();
})

