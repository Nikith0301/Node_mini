import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Todo from './components/Todo'
import Geo from './components/Geo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Todo/> */}
    <Geo/>
    </>
  )
}

export default App
