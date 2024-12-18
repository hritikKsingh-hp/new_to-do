import React, { useState } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

const initialTasks = [
  { ID: 1, task: "Organize your workspace" },
  { ID: 2, task: "Call a friend or family member" },
  { ID: 3, task: "Read a chapter of a book" },
  { ID: 4, task: "Meditate for 10 minutes" },
  { ID: 5, task: "Take a 15-minute walk" },
  { ID: 6, task: "Review your monthly budget" },
  { ID: 7, task: "Backup your phone or computer" },
  { ID: 8, task: "Do a quick workout" },
  { ID: 9, task: "Organize your email inbox" },
];

export default function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [isCheck, setIsChecked] = useState({});

  // const sortedTasks = [...tasks].sort((a, b) => {
  //   const aChecked = isCheck[a.ID] || false;
  //   const bChecked = isCheck[b.ID] || false;
  //   return aChecked - bChecked;
  // });

  const handleAddTask = (newTask) => {
    const newTaskObject = {
      ID: tasks.length + 1,
      task: newTask,
    };
    setTasks([newTaskObject, ...tasks]);
  };

  const handleCheckChange = (id) => {
    setIsChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDeleteTask = (ID) => {
    setTasks(tasks.filter((task) => task.ID !== ID));
  };

  const handleDeleteSelected = () => {
    let result = confirm("Want to delete the completed task ?");
    if (result) {
      const uncheckedTasks = tasks.filter((task) => !isCheck[task.ID]);
      setTasks(uncheckedTasks);
      setIsChecked({});
    }
  };

  const handleEditTask = (id, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.ID === id ? { ...task, task: newText } : task
      )
    );
  };

  return (
    <div className="w-[400px] h-[700px] top-11 mx-auto p-4 border rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-4 text-white text-center bg-blue-800 ">Tasker</h1>
      <TaskForm
        onAddTask={handleAddTask}
        onDeleteSelected={handleDeleteSelected}
        isCheck={isCheck}
      />
      <hr className="my-4" />
      <TaskList
        tasks={tasks}
        // tasks={sortedTasks}
        isCheck={isCheck}
        onCheckChange={handleCheckChange}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
      />
    </div>
  );
}
  