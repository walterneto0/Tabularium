function Header() {
  return (
    <header className="shrink-0 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 shadow-lg">
      <div className="px-8 py-6">
        <h1 className="text-3xl font-bold text-white pl-5">
          &lt;Tabularium /&gt;{" "}
          <strong className="text-xl pl-5">Seu gerenciador de tarefas</strong>
        </h1>
      </div>
    </header>
  );
}

export default Header;
