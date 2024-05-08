const express=require ('express')
const cors=require('cors')
const bodyParser = require('body-parser')
const mongoose =require('mongoose')
const connectDB= require('./db/connect')
require('dotenv').config()


const Location = require('./models/Location')


const app=express()
app.use(cors())
// app.use(express.json())
const tasks=require('./routes/rout_tasks.js')


const start=async()=> {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(3002,()=>{
            console.log("Server is running")
        })        
    }

    catch(e){
console.log(e)
    }
}

app.get('/home',(req,res)=>{


    res.send('this is home page')
})

app.use('/api/v1/tasks',tasks)
app.use(bodyParser.json())
app.post('/api/location', (req, res) => {
    const { latitude, longitude,accuracy } = req.body; // Access location data from request body
  
    // Process the location data (e.g., store it in a database)
    console.log('Received location:', latitude, longitude,accuracy);


    const newLocation = new Location({ latitude, longitude, accuracy });

newLocation.save()
    .then(() => console.log('Location data saved successfully'))
    .catch(error => console.error('Error saving location data:', error));
  
    res.json({ message: 'Location received successfully' }); // Send a response
  });
start()