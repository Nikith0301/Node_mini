const mongoose=require('mongoose')
const Task=require('../models/Task')
const Location = require('../models/Location')


const createTask=async (req,res)=>{

    var stat=  new Task({
        name:"Force yash to do work",
        completed:false
        })

       await stat.save()
        .then(() => console.log('Location data saved successfully'))
        .catch(error => console.error('Error saving location data:', error));
//       or

// var task=await Task.create(req.body);
// res.status(200).json({task})
// res.send('sending all tasks')


}

const getTask= async(req,res)=>{

    // const { id: taskID } = "663c677a1c7c64ad4d5ae098";
    // const task = await Task.findOne({ _id: taskID })
    // const task = await Task.findOne({ name: 'Arjun' })
    // if (!task) {
    // //   return next(createCustomError(`No task with id : ${taskID}`, 404))
    // console.log('No such id')
    // }
    console.log(req.params.id)
  try{

    // const {id:taskID}=req.params.id
    const task=await Task.findOne({_id:req.params.id})


    if(!task){
        return res.status(404).json({msg:`No such task with id :${taskID}`})
    }

    
    res.status(202).json(task)
  
  }
  catch(e){
    res.send(e)
  }

// res.send("getting Single a task")
}

const deleteTask=async (req,res)=>{


    
try{
    // const {id:taskID}=req.params;
    // const task=await Task.findOne({_id:req.params.id})
    const task= await Task.findOneAndDelete({_id:req.params.id})
    if (!task) {//if task does not exist
      console.log('No such id found',req.params.id)
    }
    else{
        console.log("SuCessfully deleted")
      res.status(200).json({ task })
    }
}
    
catch(e){
    console.log(e)
}
     

// res.end("deleting task")
}

const getAllTasks =async (req,res)=>{

  try{ 
    let tasks=await Task.find({})
  // res.send('getting all tasks')
  res.status(200).json({ tasks })
}
catch(e){
  res.send(e);
}    


}



module.exports= {getAllTasks,deleteTask,getTask,createTask}