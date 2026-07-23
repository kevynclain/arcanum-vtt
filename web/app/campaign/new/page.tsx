"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCampaign() {
  const router = useRouter();

  const [name, setName] = useState("");

  function createCampaign() {
    if (!name.trim()) {
      alert("Digite o nome da campanha");
      return;
    }

    const id = Math.random().toString(36).substring(2, 8);

    router.push(`/campaign/${id}?name=${encodeURIComponent(name)}`);
  }

  return (
    <main className="min-h-screen bg-[#08080a] text-white flex items-center justify-center">

      <div className="w-full max-w-md">

        <h1 className="text-4xl font-black text-red-600 tracking-widest text-center">
          NOVA CAMPANHA
        </h1>

        <p className="text-zinc-500 text-center mt-3">
          Crie uma nova investigação paranormal
        </p>


        <div className="mt-10 space-y-5">

          <div>
            <label className="text-sm text-zinc-400">
              Nome da campanha
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
              w-full
              mt-2
              bg-zinc-900
              border
              border-zinc-700
              rounded-lg
              p-3
              outline-none
              focus:border-red-600
              "
              placeholder="Ex: Operação Eclipse"
            />
          </div>


          <div>
            <label className="text-sm text-zinc-400">
              Sistema
            </label>

            <select
              className="
              w-full
              mt-2
              bg-zinc-900
              border
              border-zinc-700
              rounded-lg
              p-3
              "
            >
              <option>Ordem Paranormal</option>
              <option>Sistema próprio</option>
            </select>
          </div>


          <button
            onClick={createCampaign}
            className="
            w-full
            mt-5
            bg-red-700
            hover:bg-red-600
            transition
            rounded-lg
            py-3
            font-bold
            "
          >
            Criar Campanha
          </button>

        </div>

      </div>

    </main>
  );
}