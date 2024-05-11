// import { useState } from 'react';
// import AddTask from './AddTask.js';
// import TaskList from './TaskList.js';

// export default function TaskApp() {
//   const [tasks, setTasks] = useState(initialTasks);

//   function handleAddTask(text) {
//     setTasks([
//       ...tasks,
//       {
//         id: nextId++,
//         text: text,
//         done: false,
//       },
//     ]);
//   }

//   function handleChangeTask(task) {
//     setTasks(
//       tasks.map((t) => {
//         if (t.id === task.id) {
//           return task;
//         } else {
//           return t;
//         }
//       })
//     );
//   }

//   function handleDeleteTask(taskId) {
//     setTasks(tasks.filter((t) => t.id !== taskId));
//   }

//   return (
//     <>
//       <h1>Prague itinerary</h1>
//       <AddTask onAddTask={handleAddTask} />
//       <TaskList
//         tasks={tasks}
//         onChangeTask={handleChangeTask}
//         onDeleteTask={handleDeleteTask}
//       />
//     </>
//   );
// }

// let nextId = 3;

import {useState,useReducer} from "react" ;
import TaskBox from "./TaskBox.jsx";
import "./Todo.css"
import axios from 'axios';

const initialTasks = [
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];




export default function Todo(){


// const [works,setWork]=useState( [{id: 0, text: 'Visit Kafka Museum', done: true},
// {id: 1, text: 'Watch a puppet show', done: false},
// {id: 2, text: 'Lennon Wall pic', done: false}]);

function taskReducer(works,action){

  switch(action.type){

    case 'added':{return [...works,{id:action.id,text:action.text,done:false}]}

    case 'changed':{
      return works.map((w)=>{
        if(w.id===action.task.id){
          return action.task;
        }
        else{
          return w;
        }
      } )
    }

    case 'deleted':{return works.filter(w=>w.id!==action.id)}
    default: {
      throw Error('Unknown action: ' + action.type);
    }
      
  }

}

const [inputText,setInputText]=useState('');

const[works,dispatch]=useReducer(taskReducer,initialTasks)



async function  handleFetch(){
  let res=await axios.get(`http://localhost:3002/api/v1/tasks/`)
console.log('HereComes the data')
const tasks=res.data.tasks
// console.log(tasks)
for (let key in tasks){
  console.log(tasks[key].name)
dispatch({type:'added',id:nextId++,text:tasks[key].name})
}


}

function handleEdit(task){

//  setWork( works.map((work)=>{
//     if (work.id===task.id){
//       return task;
//     }
//     else{
//       return work;
//     }

//   }))
dispatch({type:'changed',task:task})

}

function handleDelete(WorkId){
  // const filteredWorks = works.filter((work, index) => index !== id);
  // setWork(filteredWorks);

  dispatch({type:'deleted',id:WorkId})
}

  function handeleWork(){
    if(inputText.trim()){
      // setWork([...works,{id:nextId++,text:inputText,done:false}])
      dispatch({type:'added',id:nextId++,text:inputText})
    }

    

setInputText('')
  }

function handleInputChange(e){
  setInputText(e.target.value);
 
}

  return (
  <>
    <h1>Enter tasks here</h1>
    <input placeholder="text"  value={inputText} onChange={handleInputChange}/>
    <button onClick={handeleWork}>Add</button>
    <button onClick={handleFetch}>Fetch</button>
    
 <TaskBox works={works} handleDelete={handleDelete} handleEdit={handleEdit}/>
     
  </>  
  )
}



let nextId = 3;