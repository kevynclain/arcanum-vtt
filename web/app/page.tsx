import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#08080a] text-white flex items-center justify-center relative overflow-hidden">

      {/* Efeito de fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#450000_0%,_transparent_45%)] opacity-40" />

      <div className="relative z-10 text-center">

        <h1 className="text-7xl font-black tracking-[0.35em] text-red-600">
          ARCANUM
        </h1>

        <p className="mt-4 text-zinc-500 uppercase tracking-widest text-sm">
          Virtual Tabletop Paranormal
        </p>

        <p className="mt-6 text-zinc-400 text-lg max-w-md mx-auto text-center">
          Uma mesa digital com mapas, fichas, dados e uma Inteligência Artificial
          como mestre da realidade desconhecida.
        </p>


        <div className="mt-12 flex flex-col gap-4 w-80 mx-auto">

          <Link
            href="/campaign/new"
            className="
              rounded-lg
              bg-red-700
              py-3
              text-lg
              font-semibold
              shadow-lg
              shadow-red-900/40
              hover:bg-red-600
              transition
              block
              text-center
            "
          >
            Nova Campanha
          </Link>


          <button
            className="
              rounded-lg
              border
              border-zinc-700
              py-3
              hover:bg-zinc-900
              transition
            "
          >
            Entrar em uma Campanha
          </button>


          <button
            className="
              rounded-lg
              border
              border-zinc-700
              py-3
              hover:bg-zinc-900
              transition
            "
          >
            Configurações
          </button>

        </div>


        <p className="mt-16 text-xs text-zinc-600">
          ARCANUM VTT • Sistema de RPG com IA
        </p>

      </div>

    </main>
  );
}