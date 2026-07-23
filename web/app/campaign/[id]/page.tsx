export default async function CampaignRoom({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ name?: string }>;
}) {
  const { id } = await params;
  const { name } = await searchParams;

  return (
    <main className="min-h-screen bg-[#08080a] text-white flex items-center justify-center">

      <div className="text-center w-full max-w-xl">

        <h1 className="text-5xl font-black text-red-600 tracking-widest">
          ARCANUM
        </h1>


        <p className="mt-6 text-zinc-400 text-2xl font-bold">
          {name || "Sala da Campanha"}
        </p>


        <div className="mt-8 bg-zinc-900 border border-zinc-700 rounded-lg p-6">

          <p className="text-zinc-400">
            Código da mesa:
          </p>

          <p className="text-3xl font-bold mt-2 tracking-widest">
            {id.toUpperCase()}
          </p>

        </div>


        <div className="mt-6 text-zinc-500">
          Mestre: Aguardando configuração
        </div>


        <div className="mt-8">

          <a
            href="/character/new"
            className="
            block
            bg-red-700
            hover:bg-red-600
            transition
            rounded-lg
            py-3
            font-bold
            "
          >
            Criar Personagem
          </a>

        </div>


      </div>

    </main>
  );
}