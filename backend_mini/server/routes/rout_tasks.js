const express =require('express')
const {getAllTasks,deleteTask,getTask,createTask}=require('../controllers/cnt_tasks.js')
const router=express.Router();


router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).delete(deleteTask)


module.exports = router