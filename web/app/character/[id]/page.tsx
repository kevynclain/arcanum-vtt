"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function CharacterPage() {

  const [personagem, setPersonagem] = useState<any>(null);

  const params = useParams();
  const router = useRouter();



  useEffect(() => {

    const id = decodeURIComponent(
      String(params.id)
    );


    const dados = localStorage.getItem(
      "personagens"
    );


    if (dados) {

      const personagens = JSON.parse(dados);


      const personagemEncontrado = personagens.find(
        (item:any) =>
          item.nome.toLowerCase() === id.toLowerCase()
      );


      if (personagemEncontrado) {


        if (personagemEncontrado.pvAtual === undefined) {
          personagemEncontrado.pvAtual = personagemEncontrado.pv;
        }


        if (personagemEncontrado.peAtual === undefined) {
          personagemEncontrado.peAtual = personagemEncontrado.pe;
        }


        if (personagemEncontrado.sanAtual === undefined) {
          personagemEncontrado.sanAtual = personagemEncontrado.san;
        }


        setPersonagem(personagemEncontrado);

      }

    }


  }, [params.id]);





  function alterarStatus(
    tipo:"pv" | "pe" | "san",
    valor:number
  ) {


    const novoPersonagem = {
      ...personagem
    };



    if (tipo === "pv") {

      novoPersonagem.pvAtual += valor;

      if (novoPersonagem.pvAtual < 0) {
        novoPersonagem.pvAtual = 0;
      }

      if (novoPersonagem.pvAtual > novoPersonagem.pv) {
        novoPersonagem.pvAtual = novoPersonagem.pv;
      }

    }



    if (tipo === "pe") {

      novoPersonagem.peAtual += valor;

      if (novoPersonagem.peAtual < 0) {
        novoPersonagem.peAtual = 0;
      }

      if (novoPersonagem.peAtual > novoPersonagem.pe) {
        novoPersonagem.peAtual = novoPersonagem.pe;
      }

    }



    if (tipo === "san") {

      novoPersonagem.sanAtual += valor;

      if (novoPersonagem.sanAtual < 0) {
        novoPersonagem.sanAtual = 0;
      }

      if (novoPersonagem.sanAtual > novoPersonagem.san) {
        novoPersonagem.sanAtual = novoPersonagem.san;
      }

    }



    const dados = JSON.parse(
      localStorage.getItem("personagens") || "[]"
    );


    const listaAtualizada = dados.map(
      (item:any) =>
        item.nome.toLowerCase() === personagem.nome.toLowerCase()
          ? novoPersonagem
          : item
    );


    localStorage.setItem(
      "personagens",
      JSON.stringify(listaAtualizada)
    );


    setPersonagem(novoPersonagem);

  }







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



          <div className="flex gap-3 mt-5">


            <button
              onClick={() =>
                router.push("/character")
              }
              className="
              flex-1
              bg-zinc-800
              hover:bg-zinc-700
              rounded-lg
              py-3
              font-bold
              "
            >
              ← Voltar
            </button>



            <button
              onClick={() =>
                router.push(
                  `/character/edit/${personagem.nome}`
                )
              }
              className="
              flex-1
              bg-red-700
              hover:bg-red-600
              rounded-lg
              py-3
              font-bold
              "
            >
              Editar
            </button>


          </div>





          <div className="mt-6 grid grid-cols-3 gap-3">


            <StatusBox
              nome="PV"
              atual={personagem.pvAtual}
              max={personagem.pv}
              onMinus={() => alterarStatus("pv",-1)}
              onPlus={() => alterarStatus("pv",1)}
            />


            <StatusBox
              nome="PE"
              atual={personagem.peAtual}
              max={personagem.pe}
              onMinus={() => alterarStatus("pe",-1)}
              onPlus={() => alterarStatus("pe",1)}
            />


            <StatusBox
              nome="SAN"
              atual={personagem.sanAtual}
              max={personagem.san}
              onMinus={() => alterarStatus("san",-1)}
              onPlus={() => alterarStatus("san",1)}
            />


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

            {personagem.pericias?.length > 0 ? (

              <ul className="space-y-2 text-zinc-300">

                {personagem.pericias.map(
                  (pericia:string)=>(
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

            {personagem.poder || "Nenhum"}

          </div>





          <h3 className="mt-8 text-xl font-bold text-red-500">
            Habilidade de Classe
          </h3>


          <div className="mt-4 bg-zinc-800 rounded-lg p-4">


            <p className="font-bold">
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
              ([atributo,valor])=>(

                <div
                  key={atributo}
                  className="bg-zinc-800 rounded-lg p-3 text-center"
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







function StatusBox({
  nome,
  atual,
  max,
  onMinus,
  onPlus
}:any) {


  return (

    <div className="bg-zinc-800 rounded-lg p-3 text-center">


      <p className="text-zinc-500 text-sm">
        {nome}
      </p>


      <p className="text-xl font-bold">
        {atual} / {max}
      </p>



      <div className="flex gap-2 mt-3 justify-center">


        <button
          onClick={onMinus}
          className="bg-red-700 px-3 rounded"
        >
          -
        </button>



        <button
          onClick={onPlus}
          className="bg-green-700 px-3 rounded"
        >
          +
        </button>


      </div>


    </div>

  );

}