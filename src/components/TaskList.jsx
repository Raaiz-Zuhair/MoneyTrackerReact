import React from 'react'
import { useTasks } from '../context/TaskContext'
import TaskItem from "../components/TaskItem"

const TaskList = () => {
  const { tasks, loading } = useTasks();

  if (loading) {
    return (
      <div className="mt-10 text-center text-gray-500">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 mx-auto"></div>
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length < 1) {
    return <p className="mt-10 text-center text-gray-500">No tasks here</p>;
  }

  return (
    <div className='md:mt-10 mt-7 max-w-5xl mx-auto'>
      {
        tasks.map((task) => (
          <div key={task.id} className='mb-3'>
            <TaskItem name={task.name} money={task.money} id={task.id} />
          </div>
        ))
      }
    </div>
  )
}

export default TaskList
