import React, { useState, useEffect } from "react";
import { Button } from "./Button/Button";
import { TiPlus } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaBackspace } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { useTasks } from "../context/TaskContext";
import { v4 as uuidv4 } from "uuid";

const TaskForm = () => {
  const {
    tasks,
    addTask,
    fields,
    setFields,
    deleteTask,
    updateTask,
    clearAllTasks,
  } = useTasks();
  const [name, setName] = useState("");
  const [money, setMoney] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || money === "") {
      alert("Please fil the fields!");
    }else{
      const item = {
        id: uuidv4(),
        name: name,
        money: parseInt(money),
      };
  
      addTask(item);
      setName("");
      setMoney("");
    };

    }

    useEffect(() => {
      if (fields.edit === true) {
        setName(fields.item.name);
        setMoney(fields.item.money);
      }
    }, [fields]);
  
    

    const deleteItem = () => {
      deleteTask(fields.item.id);
      setFields({
        edit: false,
        item: {},
      });
      setName("");
      setMoney("");
    };

  const updateItem = () => {
    const newItem = {
      id: fields.item.id,
      name: name,
      money: parseInt(money),
    };

    console.log(newItem);

    updateTask(newItem);
    setName("");
    setMoney("");
    setFields(false);
  };

  const handleClearAll = () => {
    if (tasks.length === 0) {
      alert("No tasks");
    } else {
      const confirmClear = window.confirm(
        "Are you sure you want to clear all tasks?"
      );
      if (confirmClear) {
        clearAllTasks();
        setName("");
        setMoney("");
        setFields(false);
      }
    }
  };

  return (
    <div className="md:mt-10 mt-3 shadow-lg py-6 px-4 sm:px-8 rounded max-w-5xl mx-auto">
      <form onSubmit={handleSubmit}>
        <h3 className="md:text-2xl text-4xl text-center md:text-left md:font-normal font-medium  ">
          Add Task and Money
        </h3>
        <div className="mt-6 flex flex-col sm:flex-row sm:gap-8">
          <input
            type="text"
            className="w-full p-2 outline-0 border-b border-gray-300 mb-4 sm:mb-0"
            placeholder="Add Task"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            className="w-full p-2 outline-0 border-b border-gray-300"
            placeholder="Add Money"
            value={money}
            onChange={(e) => setMoney(e.target.value)}
          />
        </div>

        <div className="mt-8 flex flex-wrap gap-3 justify-center sm:justify-start">
          {!fields.edit && (
            <Button
              bg="bg-blue-500"
              type="submit"
              className="flex-1 sm:flex-none max-w-xs"
            >
              <TiPlus />
              Add Task
            </Button>
          )}
          {fields.edit && (
            <>
              <Button
                bg="bg-orange-500"
                type="button"
                onClick={updateItem}
                className="flex-1 sm:flex-none max-w-xs"
              >
                <FaEdit />
                Update Task
              </Button>
              <Button
                bg="bg-red-500"
                type="button"
                onClick={deleteItem}
                className="flex-1 sm:flex-none max-w-xs"
              >
                <MdDelete />
                Delete Task
              </Button>
              <Button
                bg="bg-gray-500"
                type="button"
                onClick={() => {
                  setFields(false);
                  setName("");
                  setMoney("");
                }}
                className="flex-1 sm:flex-none max-w-xs"
              >
                <FaBackspace />
                Back
              </Button>
            </>
          )}
          <Button
            bg="bg-blue-800"
            type="button"
            onClick={handleClearAll}
            className="flex-1 sm:flex-none max-w-xs"
          >
            <GrClearOption />
            Clear All
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
