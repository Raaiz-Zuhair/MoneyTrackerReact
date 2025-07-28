import React from 'react'
import { useTasks } from '../context/TaskContext'
import TaskItem from "../components/TaskItem"

const TaskList = () => {
  const {tasks , loading , setLoading} = useTasks();

  if (tasks.length < 1) {
    return <p className="mt-10 text-center text-gray-500">No tasks found</p>;
  }
  return (
    <div className='md:mt-10 mt-7 max-w-5xl mx-auto'>
      {
        loading ? (
          <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
          <p className="mt-2">Loading tasks...</p>
        </div>
        ): (
          tasks.map((task) => (
          <div key={task.id} className='mb-3'>
            <TaskItem name={task.name} money={task.money} id={task.id}/>
          </div>
          ))
        )
        
      }
      
    </div>
  )
}

export default TaskList