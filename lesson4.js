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

const ownerSchema = new mongoose.Schema({
    name:String,
    age: Number
},{timestamps:true});
const Owner = mongoose.model('Owner',ownerSchema);

const dogSchema = new mongoose.Schema({
    name: String,
    age: Number,
    tag: {
        type:Number,
        unique:true,
        required: true
    },
    owner: {type: mongoose.Types.ObjectId, ref:'Owner'}
},{timestamps: true});

// create a model
const Dog = mongoose.model('Dog',dogSchema);

//run some query
mongoose.connection.on('open', async ()=>{
    // create an owner
    // const owner = await Owner.create({name:'Alex Ebus',age:25});

    // create a dog
    // const dog = await Dog.create({name:'Jimmy',age:5,tag:2, owner:owner});

    // search for jimmy
    const dog = await Dog.findOne({name:'Jimmy'}).populate('owner');//the owner value inside the Dog schema

    console.log(dog);

//close connection
mongoose.connection.close();
})

