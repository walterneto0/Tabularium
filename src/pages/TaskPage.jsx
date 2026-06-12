import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft, Pencil } from "lucide-react";
import Header from "../components/Header";

function TaskPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const title = searchParams.get("title");
  const description = searchParams.get("description");

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Header />

      <div className="px-8 py-6 relative">
        <button
          onClick={() => navigate(-1)}
          className="
              absolute
              left-8
              top-1/2
              -translate-y-1/2
              text-slate-800
              hover:bg-black/10
              p-2
              rounded-xl
              transition
            "
        >
          <ChevronLeft size={28} />
        </button>

        <h1 className="text-3xl font-bold text-center text-slate-800">
          Detalhes da Tarefa
        </h1>
      </div>

      <main className="flex-1 flex justify-center items-start pt-0 p-8">
        <div
          className="
            w-full
            max-w-5xl
            bg-white
            rounded-3xl
            border
            border-slate-200
            shadow-lg
            p-8
          "
        >
          <div className="space-y-8 p-t-0">
            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-3">
                TÍTULO
              </label>

              <div className="flex gap-4">
                <div
                  className="
                    flex-1
                    bg-slate-50
                    border
                    border-slate-200
                    rounded-2xl
                    px-6
                    py-4
                    text-xl
                    font-semibold
                    text-slate-800
                  "
                >
                  {title}
                </div>

                <button
                  className="
                    bg-indigo-50
                    text-indigo-600
                    px-5
                    rounded-2xl
                    hover:bg-indigo-100
                    transition
                  "
                >
                  <Pencil size={22} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-500 mb-3">
                DESCRIÇÃO
              </label>

              <div
                className="
                  min-h-[500px]
                  bg-slate-50
                  border
                  border-slate-200
                  rounded-2xl
                  p-6
                  text-slate-700
                  whitespace-pre-wrap
                "
              >
                {description}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TaskPage;
