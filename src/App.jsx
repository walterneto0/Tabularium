import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        { method: "GET" }
      );

      const data = await response.json();
      console.log(data);
    };

    fetchTasks();
  }, []);

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
    <div className="min-h-screen bg-slate-100">
      <header className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 shadow-lg">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="text-5xl font-bold text-white">
            Gerenciador de Tarefas
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-12 gap-8">
          <aside className="col-span-3">
            <AddTask onAddTaskSubmit={onAddTaskSubmit} />
          </aside>

          <section className="col-span-9">
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