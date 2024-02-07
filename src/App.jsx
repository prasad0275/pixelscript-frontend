import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EditorWindow from './pages/EditorWindow'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <EditorWindow /> */}
      <Outlet/> 
    </>
  )
}

export default App
