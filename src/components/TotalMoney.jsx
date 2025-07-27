import React from 'react'
import { useTasks } from '../context/TaskContext'

const TotalMoney = () => {

    const {totalMoney} = useTasks();

  return (
    <div className='text-center md:text-5xl text-4xl font-medium md:mt-10 mt-7'>Total Money: {totalMoney}</div>
  )
}

export default TotalMoney