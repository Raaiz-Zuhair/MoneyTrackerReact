import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

const api = "https://688609f6f52d34140f6b368a.mockapi.io/money-tracker";

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);
  const [fields, setFields] = useState({
    edit: false,
    item: {},
  });

  const fetchTasks = async () => {
    const res = await axios.get(api);
    setTasks(res.data);
    const total = res.data.reduce((acc, curr) => acc + Number(curr.money), 0);
    setTotalMoney(total);
  };

  useEffect(() => {
    fetchTasks();
  }, [tasks, totalMoney, setTasks]);

  const addTask = async (item) => {
    const res = await axios.post(api, item);

    setTasks((prev) => [res.data, ...prev]);
  };

  const deleteTask = async (id) => {
    const res = await axios.delete(`${api}/${id}`);
    const data = await res.data;
    setTasks((prev) => prev.filter((item) => item.id !== id));
  };

  const updateTask = async (newItem) => {
    const res = await axios.put(`${api}/${newItem.id}`, newItem);
    const data = res.data;

    setTasks((prev) => prev.map((item) => (item.id === data.id ? data : item)));

    const oldMoney = Number(oldItem.money);
    const newMoney = Number(data.money);
    setTotalMoney((prev) => prev - oldMoney + newMoney);
  };

  const clearAllTasks = async () => {
    
    const res = tasks.map((task) => 
      axios.delete(`${api}/${task.id}`)
    );

    await Promise.all(res);
  }

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
        clearAllTasks
      }}
    >
      {children}
    </TaskContext>
  );
};
