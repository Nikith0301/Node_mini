const mongoose=require('mongoose')
const Task=require('../models/Task')
const Location = require('../models/Location')


const createTask= (req,res)=>{

res.send('sending all tasks')
}

const getTask= (req,res)=>{
res.send("Sending Single a task")
}

const deleteTask=(req,res)=>{

res.send("deleting task")
}

const getAllTasks =(req,res)=>{
res.send('getting all tasks')
}



module.exports= {getAllTasks,deleteTask,getTask,createTask}