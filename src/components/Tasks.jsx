import {
  ChevronRightIcon,
  Trash2,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function Tasks({ tasks, onTaskClick, onDeleteClick }) {
  const navigate = useNavigate();
  const [columnCount, setColumnCount] = useState(3);

  useEffect(() => {
    function updateColumnCount() {
      if (window.innerWidth < 768) {
        setColumnCount(1);
        return;
      }

      if (window.innerWidth < 1280) {
        setColumnCount(2);
        return;
      }

      setColumnCount(3);
    }

    updateColumnCount();

    window.addEventListener("resize", updateColumnCount);

    return () => window.removeEventListener("resize", updateColumnCount);
  }, []);

  const taskColumns = useMemo(() => {
    const columns = Array.from({ length: columnCount }, () => ({
      height: 0,
      tasks: [],
    }));

    tasks.forEach((task) => {
      const shortestColumn = columns.reduce((shortest, column) => {
        return column.height < shortest.height ? column : shortest;
      }, columns[0]);

      const contentLength = `${task.title} ${task.description}`.length;

      shortestColumn.tasks.push(task);
      shortestColumn.height += Math.max(250, 180 + contentLength * 1.5);
    });

    return columns.map((column) => column.tasks);
  }, [columnCount, tasks]);

  function onSeeDetailsClick(task) {
    const query = new URLSearchParams();

    query.set("title", task.title);
    query.set("description", task.description);

    navigate(`/task?${query.toString()}`);
  }

  return (
    <div
      className="grid min-w-0 items-start gap-6"
      style={{ gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))` }}
    >
      {taskColumns.map((columnTasks, columnIndex) => (
        <ul key={columnIndex} className="flex min-w-0 flex-col gap-6">
          {columnTasks.map((task) => (
            <li
              key={task.id}
              className="
                flex
                min-h-[250px]
                min-w-0
                w-full
                flex-col
                bg-white
                border
                border-slate-200
                rounded-3xl
                p-6
                shadow-sm
                hover:shadow-xl
                transition-all
                duration-300
              "
            >
              <button
                onClick={() => onTaskClick(task.id)}
                className="flex min-w-0 items-start gap-3 text-left"
              >
                {task.isCompleted ? (
                  <CheckCircle2
                    className="mt-1 shrink-0 text-emerald-500"
                    size={22}
                  />
                ) : (
                  <Circle
                    className="mt-1 shrink-0 text-slate-400"
                    size={22}
                  />
                )}

                <div className="min-w-0">
                  <h3
                    className={`text-wrap-anywhere text-lg font-bold ${
                      task.isCompleted
                        ? "line-through text-slate-400"
                        : "text-slate-800"
                    }`}
                  >
                    {task.title}
                  </h3>

                  <p
                    className={`text-wrap-anywhere mt-2 text-sm ${
                      task.isCompleted
                        ? "line-through text-slate-300"
                        : "text-slate-500"
                    }`}
                  >
                    {task.description}
                  </p>
                </div>
              </button>

              <div className="flex-1" />

              <div className="mt-6 flex min-w-0 gap-3">
                <button
                  onClick={() => onSeeDetailsClick(task)}
                  className="
                    min-w-0
                    flex-1
                    bg-indigo-50
                    text-indigo-600
                    font-medium
                    py-3
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    gap-2
                    hover:bg-indigo-100
                    transition
                  "
                >
                  Detalhes
                  <ChevronRightIcon size={18} />
                </button>

                <button
                  onClick={() => onDeleteClick(task.id)}
                  className="
                    bg-red-50
                    text-red-500
                    px-4
                    rounded-xl
                    hover:bg-red-100
                    transition
                  "
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default Tasks;
