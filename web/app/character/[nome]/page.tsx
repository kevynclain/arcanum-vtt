export default async function CharacterSheet({
  params,
}: {
  params: Promise<{ nome: string }>;
}) {
  const { nome } = await params;

  return (
    <main className="min-h-screen bg-[#08080a] text-white flex items-center justify-center">

      <div className="w-full max-w-xl">

        <h1 className="text-5xl font-black text-red-600 tracking-widest text-center">
          ARCANUM
        </h1>

        <div className="mt-8 bg-zinc-900 border border-zinc-700 rounded-lg p-6">

          <h2 className="text-3xl font-bold">
            {nome.toUpperCase()}
          </h2>

          <p className="mt-3 text-zinc-400">
            Origem: Investigador
          </p>

          <p className="text-zinc-400">
            Classe: Especialista
          </p>

          <p className="text-zinc-400">
            NEX: 10%
          </p>


          <hr className="my-6 border-zinc-700" />


          <h3 className="text-red-500 font-bold text-xl">
            ATRIBUTOS
          </h3>

          <div className="grid grid-cols-5 gap-3 mt-4 text-center">

            {["FOR", "AGI", "INT", "PRE", "VIG"].map((atributo) => (
              <div
                key={atributo}
                className="bg-zinc-800 rounded-lg p-3"
              >
                <p className="text-zinc-400">
                  {atributo}
                </p>

                <p className="text-2xl font-bold">
                  1
                </p>

              </div>
            ))}

          </div>


        </div>

      </div>

    </main>
  );
}