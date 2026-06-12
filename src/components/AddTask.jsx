import { useState } from "react";

function AddTask({ onAddTaskSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit() {
    if (title.trim() === "" || description.trim() === "") {
      return;
    }

    onAddTaskSubmit(title, description);

    setTitle("");
    setDescription("");
  }

  return (
    <div className="h-full bg-white rounded-3xl border border-slate-200 shadow-lg p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
          <span className="text-2xl">📝</span>
        </div>

        <h2 className="text-3xl font-bold text-slate-800">
          Adicionar nova tarefa
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block mb-2 font-medium text-slate-700">
            Título
          </label>

          <input
            type="text"
            placeholder="Digite o título da tarefa"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="
              w-full
              px-5
              py-4
              border
              border-slate-200
              rounded-2xl
              bg-white
              outline-none
              transition
              focus:ring-4
              focus:ring-blue-100
              focus:border-blue-400
            "
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-slate-700">
            Descrição
          </label>

          <textarea
            rows={12}
            placeholder="Digite a descrição da tarefa"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="
              w-full
              px-5
              py-4
              border
              border-slate-200
              rounded-2xl
              resize-none
              outline-none
              transition
              focus:ring-4
              focus:ring-blue-100
              focus:border-blue-400
            "
          />
        </div>

        <button
          onClick={handleSubmit}
          className="
            w-full
            py-4
            rounded-2xl
            text-white
            font-semibold
            bg-gradient-to-r
            from-blue-600
            to-violet-600
            shadow-lg
            transition
            hover:scale-[1.02]
            active:scale-[0.99]
          "
        >
          Adicionar tarefa
        </button>
      </div>
    </div>
  );
}

export default AddTask;