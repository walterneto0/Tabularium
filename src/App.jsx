import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }

      return task;
    });

    setTasks(newTasks);
  }

  function onDeleteClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: uuidv4(),
      title,
      description,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-slate-100">
      <Header />

      <main className="flex min-h-0 flex-1 p-8">
        <div className="grid min-h-0 flex-1 grid-cols-12 gap-8">
          <aside className="col-span-3 h-full">
            <AddTask onAddTaskSubmit={onAddTaskSubmit} />
          </aside>

          <section className="scrollbar-modern col-span-9 min-h-0 min-w-0 overflow-x-hidden overflow-y-auto pr-2">
            <Tasks
              tasks={tasks}
              onTaskClick={onTaskClick}
              onDeleteClick={onDeleteClick}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
