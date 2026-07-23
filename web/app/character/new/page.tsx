"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCharacter() {
  const router = useRouter();

  const [name, setName] = useState("");

  function createCharacter() {
    if (!name.trim()) {
      alert("Digite o nome do personagem");
      return;
    }

    router.push(`/character/${name}`);
  }

  return (
    <main className="min-h-screen bg-[#08080a] text-white flex items-center justify-center">

      <div className="w-full max-w-2xl">

        <h1 className="text-4xl font-black text-red-600 tracking-widest text-center">
          NOVO PERSONAGEM
        </h1>

        <p className="text-zinc-500 text-center mt-3">
          Crie sua ficha de investigação paranormal
        </p>


        <div className="mt-10 bg-zinc-900 border border-zinc-700 rounded-lg p-6 space-y-5">


          <div>
            <label className="text-zinc-400">
              Nome do personagem
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
              w-full
              mt-2
              bg-zinc-800
              border
              border-zinc-700
              rounded-lg
              p-3
              "
              placeholder="Ex: Tsurugi"
            />
          </div>


          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-zinc-400">
                Origem
              </label>

              <input
                className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-lg p-3"
                placeholder="Ex: Investigador"
              />
            </div>


            <div>
              <label className="text-zinc-400">
                Classe
              </label>

              <input
                className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-lg p-3"
                placeholder="Ex: Especialista"
              />
            </div>

          </div>


          <div>
            <label className="text-zinc-400">
              NEX
            </label>

            <input
              className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-lg p-3"
              placeholder="Ex: 10%"
            />
          </div>


          <h2 className="text-xl font-bold text-red-500 pt-4">
            Atributos
          </h2>


          <div className="grid grid-cols-5 gap-3">

            {["FOR", "AGI", "INT", "PRE", "VIG"].map((atributo) => (
              <div key={atributo}>
                <label className="text-sm text-zinc-400">
                  {atributo}
                </label>

                <input
                  className="
                  w-full
                  mt-2
                  bg-zinc-800
                  border
                  border-zinc-700
                  rounded-lg
                  p-2
                  text-center
                  "
                  defaultValue="1"
                />
              </div>
            ))}

          </div>


          <button
            onClick={createCharacter}
            className="
            w-full
            bg-red-700
            hover:bg-red-600
            transition
            rounded-lg
            py-3
            font-bold
            mt-5
            "
          >
            Criar Personagem
          </button>


        </div>

      </div>

    </main>
  );
}