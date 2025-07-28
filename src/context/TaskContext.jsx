import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

const api = "https://688609f6f52d34140f6b368a.mockapi.io/money-tracker";

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editTask , setEditTask] = useState(false)
  const [fields, setFields] = useState({
    edit: false,
    item: {},
  });

  const fetchTasks = async () => {
    try {
      setLoading(true)
      const res = await axios.get(api);
      setTasks(res.data);
      const total = res.data.reduce((acc, curr) => acc + Number(curr.money), 0);
      setTotalMoney(total);
      setEditTask(true)
    } catch (err) {
      console.log(`Error in fetching tasks ${err}`);
    }finally{
      setLoading(false)
      setEditTask(false)
    }

  };

  const addTask = async (item) => {
    try {
      const res = await axios.post(api, item);
      setTasks((prev) => [res.data, ...prev]);
      setEditTask(true)
    } catch (err) {
      console.log(`Error in adding tasks ${err}`);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`${api}/${id}`);
      const data = await res.data;
      setTasks((prev) => prev.filter((item) => item.id !== id));
      setEditTask(true)
    } catch (err) {
      console.log(`Error in Deleteing Task ${err}`);
    } 
  };

  const updateTask = async (newItem) => {
    try{
    const res = await axios.put(`${api}/${newItem.id}`, newItem);
    const data = res.data;
    setTasks((prev) => prev.map((item) => (item.id === data.id ? data : item)));
    setEditTask(true)
  } catch (err) {
    console.log(`Error in Updating Task ${err}`);
  } 
  };

  const clearAllTasks = async () => {
    const res = tasks.map((task) => axios.delete(`${api}/${task.id}`));
    await Promise.all(res);
    setEditTask(true)
  };

  useEffect(() => {
    fetchTasks();
  }, [editTask]);

  return (
    <TaskContext
      value={{
        totalMoney,
        tasks,
        addTask,
        fields,
        setFields,
        deleteTask,
        updateTask,
        clearAllTasks,
        loading,
        setLoading
      }}
    >
      {children}
    </TaskContext>
  );
};
