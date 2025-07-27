import React from 'react'
import Header from "./components/Header"
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import TotalMoney from "./components/TotalMoney"

const App = () => {
  return (
    <>
    <Header/>
    <TaskForm/>
    <TotalMoney/>
    <TaskList/>
    </>
  )
}

export default App