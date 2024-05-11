import {useState,useReducer} from "react" ;
import TaskBox from "./TaskBox.jsx";
import "./Todo.css"
import axios from 'axios';
import {  v4 as uuid }  from 'uuid';
const initialTasks = [
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];




export default function Todo(){




function taskReducer(works,action){

  switch(action.type){


    case 'fetch':{
      console.log('fetching',action.tasks)
      
      return action.tasks
    }
    case 'added':{
      console.log('posting')
      axios.post('http://localhost:3002/api/v1/tasks/',{id:action.id,name:action.text,completed:false})//completed || done means same
      return [...works,{id:action.id,text:action.text,done:false}]}

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

    case 'deleted':{
      axios.delete(`http://localhost:3002/api/v1/tasks/${action.id}`,)
      return works.filter(w=>w.id!==action.id)}
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
dispatch({type:'fetch',tasks})
// console.log(tasks)
for (let key in tasks){
  console.log(tasks[key].name)

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
      const randomUUID = uuid();
      // dispatch({type:'added',id:nextId++,text:inputText})

      dispatch({type:'added',id:randomUUID,text:inputText})
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