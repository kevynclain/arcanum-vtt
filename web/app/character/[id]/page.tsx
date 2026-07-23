"use client";

import { useEffect, useState } from "react";

export default function CharacterPage() {

  const [personagem, setPersonagem] = useState<any>(null);


  useEffect(() => {

    const dados = localStorage.getItem("personagem");

    if (dados) {
      setPersonagem(JSON.parse(dados));
    }

  }, []);




  if (!personagem) {

    return (
      <main className="min-h-screen bg-[#08080a] text-white flex items-center justify-center">

        <p className="text-zinc-400">
          Nenhum personagem encontrado
        </p>

      </main>
    );

  }





  return (

    <main className="min-h-screen bg-[#08080a] text-white flex items-center justify-center">


      <div className="w-full max-w-xl">


        <h1 className="text-5xl font-black text-red-600 tracking-widest text-center">
          ARCANUM
        </h1>





        <div className="mt-10 bg-zinc-900 border border-zinc-700 rounded-lg p-6">





          <h2 className="text-3xl font-bold text-center">
            {personagem.nome}
          </h2>







          <div className="mt-6 grid grid-cols-3 gap-3">



            <div className="bg-zinc-800 rounded-lg p-3 text-center">

              <p className="text-zinc-500 text-sm">
                PV
              </p>

              <p className="text-xl font-bold">
                {personagem.pv ?? "—"}
              </p>

            </div>





            <div className="bg-zinc-800 rounded-lg p-3 text-center">

              <p className="text-zinc-500 text-sm">
                PE
              </p>

              <p className="text-xl font-bold">
                {personagem.pe ?? "—"}
              </p>

            </div>





            <div className="bg-zinc-800 rounded-lg p-3 text-center">

              <p className="text-zinc-500 text-sm">
                SAN
              </p>

              <p className="text-xl font-bold">
                {personagem.san ?? "—"}
              </p>

            </div>


          </div>









          <div className="mt-8 space-y-3 text-zinc-300">


            <p>
              <span className="text-zinc-500">
                Origem:
              </span>{" "}
              {personagem.origem}
            </p>




            <p>
              <span className="text-zinc-500">
                Classe:
              </span>{" "}
              {personagem.classe}
            </p>




            <p>
              <span className="text-zinc-500">
                NEX:
              </span>{" "}
              {personagem.nex}
            </p>


          </div>








          <h3 className="mt-8 text-xl font-bold text-red-500">
            Perícias Treinadas
          </h3>





          <div className="mt-4 bg-zinc-800 rounded-lg p-4">


            {personagem.pericias &&
            personagem.pericias.length > 0 ? (

              <ul className="space-y-2 text-zinc-300">

                {personagem.pericias.map(
                  (pericia:string) => (

                    <li key={pericia}>
                      • {pericia}
                    </li>

                  )
                )}

              </ul>


            ) : (

              <p className="text-zinc-500">
                Nenhuma perícia definida
              </p>

            )}


          </div>









          <h3 className="mt-8 text-xl font-bold text-red-500">
            Poder de Origem
          </h3>




          <div className="mt-4 bg-zinc-800 rounded-lg p-4">


            <p className="text-zinc-300 font-bold">
              {personagem.poder || "Nenhum"}
            </p>


          </div>









          <h3 className="mt-8 text-xl font-bold text-red-500">
            Habilidade de Classe
          </h3>




          <div className="mt-4 bg-zinc-800 rounded-lg p-4">


            <p className="text-zinc-300 font-bold">
              {personagem.habilidadeClasse || "Nenhuma"}
            </p>



            <p className="text-zinc-400 mt-2">
              {personagem.descricaoClasse || ""}
            </p>


          </div>









          <h3 className="mt-8 text-xl font-bold text-red-500">
            Atributos
          </h3>







          <div className="grid grid-cols-5 gap-3 mt-4">


            {Object.entries(personagem.atributos).map(
              ([atributo, valor]) => (

                <div
                  key={atributo}
                  className="
                  bg-zinc-800
                  rounded-lg
                  p-3
                  text-center
                  "
                >

                  <p className="text-zinc-400 text-sm">
                    {atributo}
                  </p>


                  <p className="text-2xl font-bold">
                    {String(valor)}
                  </p>


                </div>

              )
            )}


          </div>






        </div>


      </div>


    </main>

  );

}