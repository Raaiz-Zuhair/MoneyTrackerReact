import React from 'react'
import { MdEdit } from "react-icons/md";
import { useTasks } from '../context/TaskContext';

const TaskItem = ({id,name,money}) => {

  const {setFields} = useTasks();

  const handleEditClick = (id) => {
    setFields({
      edit:true,
      item:{
        id:id,
        name:name,
        money:money
      }
    })
  }

  return (
    <div
    className="flex justify-between items-start sm:items-center shadow py-4 px-4 sm:px-8 rounded max-w-5xl mx-auto mb-4"
    id={id}
  >
    <div className="mb-3 sm:mb-0 text-lg">
      <strong>{name}: </strong>
      <em>{money} Rs</em>
    </div>
    <MdEdit
      size={24}
      className="cursor-pointer text-gray-600 hover:text-gray-900"
      onClick={() => handleEditClick(id)}
    />
  </div>
  
  )
}

export default TaskItem