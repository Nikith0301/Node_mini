// const mongoose=require ('mongoose')

// const TaskSchema= new mongoose.Schema({name:{type:String,required:[true,"Name must be provided"],trim:true} ,completed:{type:Boolean,default:False} }  )


// module.exports= mongoose.model("Task",TaskSchema)

const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [45, 'name can not be more than 45 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('Task', TaskSchema)