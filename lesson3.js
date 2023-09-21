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
    // const dog = await Dog.find({});
    // const dog = await Dog.findById("650c600c5a81435089054033");
    // const dog = await Dog.findOne({name:"Bingo"})
    // const dog = await Dog.findOne({age:{$gt:1}});
    // const dog = await Dog.findByIdAndUpdate("650c600c5a81435089054033",{age:5},{new:true})
    //  const dog = await Dog.updateOne({name:'Bingo'},{ age: 9}, {new:true});

    // update the individual dog direct
    const dog = await Dog.findOne({name:'Bingo'});
    dog.age = 20;
    await dog.save();

    console.log(dog);

//close connection
mongoose.connection.close();
})

