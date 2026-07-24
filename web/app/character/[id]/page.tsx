"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { progressaoClasse } from "@/app/data/progressao";
import { trilhas } from "@/app/data/trilhas";

export default function CharacterPage() {

  const [personagem, setPersonagem] = useState<any>(null);

  const params = useParams();
  const router = useRouter();

  useEffect(() => {

    const id = String(params.id);

    const dados = localStorage.getItem(
      "personagens"
    );

    if(!dados) return;

    const personagens = JSON.parse(dados);

    const encontrado = personagens.find(

      (item:any)=>

        item.id === id

    );

    if(!encontrado) return;

    const nexAtual = parseInt(encontrado.nex);

    const progressao = progressaoClasse.find(

      (item)=>

        item.classe === encontrado.classe

    );

    const trilhaAtual = trilhas.find(

      (item)=>

        item.nome === encontrado.trilha

    );

    const poderesClasse =

      progressao?.poderes.filter(

        (item)=>

          parseInt(item.nex) <= nexAtual

      ) || [];

    const poderesTrilha =

      trilhaAtual?.poderes.filter(

        (item)=>

          parseInt(item.nex) <= nexAtual

      ) || [];

    const personagemAtualizado = {

      ...encontrado,

      poderesClasse,

      poderesTrilha,

      pvAtual:

        encontrado.pvAtual ??

        encontrado.pv,

      peAtual:

        encontrado.peAtual ??

        encontrado.pe,

      sanAtual:

        encontrado.sanAtual ??

        encontrado.san,

    };

    setPersonagem(personagemAtualizado);

    const listaAtualizada = personagens.map(

      (item:any)=>

        item.id === id

          ? personagemAtualizado

          : item

    );

    localStorage.setItem(

      "personagens",

      JSON.stringify(listaAtualizada)

    );

  }, [params.id]);
    function alterarStatus(

    tipo:"pv"|"pe"|"san",

    valor:number

  ){

    if(!personagem) return;

    const novo = {

      ...personagem

    };

    if(tipo==="pv"){

      novo.pvAtual += valor;

      novo.pvAtual = Math.max(

        0,

        Math.min(

          novo.pvAtual,

          novo.pv

        )

      );

    }

    if(tipo==="pe"){

      novo.peAtual += valor;

      novo.peAtual = Math.max(

        0,

        Math.min(

          novo.peAtual,

          novo.pe

        )

      );

    }

    if(tipo==="san"){

      novo.sanAtual += valor;

      novo.sanAtual = Math.max(

        0,

        Math.min(

          novo.sanAtual,

          novo.san

        )

      );

    }

    const dados = JSON.parse(

      localStorage.getItem("personagens") || "[]"

    );

    const lista = dados.map(

      (item:any)=>

        item.id === personagem.id

          ? novo

          : item

    );

    localStorage.setItem(

      "personagens",

      JSON.stringify(lista)

    );

    setPersonagem(novo);

  }

  if(!personagem){

    return(

      <main className="
      min-h-screen
      bg-[#08080a]
      text-white
      flex
      items-center
      justify-center
      ">

        <p className="text-zinc-400">

          Nenhum personagem encontrado

        </p>

      </main>

    );

  }

  return(

    <main className="
    min-h-screen
    bg-[#08080a]
    text-white
    flex
    items-center
    justify-center
    p-5
    ">

      <div className="w-full max-w-xl">

        <h1 className="
        text-5xl
        font-black
        text-red-600
        tracking-widest
        text-center
        ">

          ARCANUM

        </h1>

        <div className="
        mt-10
        bg-zinc-900
        border
        border-zinc-700
        rounded-lg
        p-6
        ">

          <h2 className="
          text-3xl
          font-bold
          text-center
          ">

            {personagem.nome}

          </h2>

          {

            personagem.imagem && (

              <div className="
              flex
              justify-center
              mt-5
              ">

                <img

                  src={personagem.imagem}

                  alt={personagem.nome}

                  className="
                  w-48
                  h-48
                  object-cover
                  rounded-lg
                  border
                  border-zinc-700
                  "

                />

              </div>

            )

          }

          <div className="
          flex
          gap-3
          mt-5
          ">

            <button

              onClick={()=>

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

              onClick={()=>

                router.push(

                  `/character/edit/${personagem.id}`

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

          <div className="
          mt-6
          grid
          grid-cols-3
          gap-3
          ">

            <StatusBox

              nome="PV"

              atual={personagem.pvAtual}

              max={personagem.pv}

              onMinus={()=>

                alterarStatus("pv",-1)

              }

              onPlus={()=>

                alterarStatus("pv",1)

              }

            />

            <StatusBox

              nome="PE"

              atual={personagem.peAtual}

              max={personagem.pe}

              onMinus={()=>

                alterarStatus("pe",-1)

              }

              onPlus={()=>

                alterarStatus("pe",1)

              }

            />

            <StatusBox

              nome="SAN"

              atual={personagem.sanAtual}

              max={personagem.san}

              onMinus={()=>

                alterarStatus("san",-1)

              }

              onPlus={()=>

                alterarStatus("san",1)

              }

            />

          </div>
		            <div className="
          mt-8
          space-y-3
          text-zinc-300
          ">

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
                Trilha:
              </span>{" "}

              {personagem.trilha || "Nenhuma"}

            </p>

            <p>

              <span className="text-zinc-500">
                NEX:
              </span>{" "}

              {personagem.nex}

            </p>

          </div>

          <h3 className="
          mt-8
          text-xl
          font-bold
          text-red-500
          ">

            Informações do Investigador

          </h3>

          <div className="
          mt-4
          bg-zinc-800
          rounded-lg
          p-4
          space-y-3
          ">

            <p>

              <span className="text-zinc-500">
                Jogador:
              </span>{" "}

              {personagem.jogador || "Não definido"}

            </p>

            <p>

              <span className="text-zinc-500">
                Idade:
              </span>{" "}

              {personagem.idade || "Não definido"}

            </p>

          </div>

          <h3 className="
          mt-8
          text-xl
          font-bold
          text-red-500
          ">

            História

          </h3>

          <div className="
          mt-4
          bg-zinc-800
          rounded-lg
          p-4
          text-zinc-300
          ">

            {personagem.historia ||

            "Nenhuma história registrada"}

          </div>

          <h3 className="
          mt-8
          text-xl
          font-bold
          text-red-500
          ">

            Aparência

          </h3>

          <div className="
          mt-4
          bg-zinc-800
          rounded-lg
          p-4
          text-zinc-300
          ">

            {personagem.aparencia ||

            "Nenhuma aparência registrada"}

          </div>

          <h3 className="
          mt-8
          text-xl
          font-bold
          text-red-500
          ">

            Anotações

          </h3>

          <div className="
          mt-4
          bg-zinc-800
          rounded-lg
          p-4
          text-zinc-300
          ">

            {personagem.anotacoes ||

            "Nenhuma anotação registrada"}

          </div>

          <h3 className="
          mt-8
          text-xl
          font-bold
          text-red-500
          ">

            Perícias Treinadas

          </h3>

          <div className="
          mt-4
          bg-zinc-800
          rounded-lg
          p-4
          ">

            {

              personagem.pericias?.length > 0 ?

              (

                <ul className="
                space-y-2
                text-zinc-300
                ">

                  {

                    personagem.pericias.map(

                      (item:string,index:number)=>(

                        <li
                          key={`${item}-${index}`}
                        >

                          • {item}

                        </li>

                      )

                    )

                  }

                </ul>

              )

              :

              (

                <p className="text-zinc-500">

                  Nenhuma perícia definida

                </p>

              )

            }

          </div>
		  <h3 className="
mt-8
text-xl
font-bold
text-red-500
">

  Progressão da Classe

</h3>

<div className="
mt-4
space-y-3
">

  {

    personagem.poderesClasse?.length > 0 ?

    (

      personagem.poderesClasse.map((p:any)=>(

        <div

          key={p.nex}

          className="
          bg-zinc-800
          rounded-lg
          p-4
          border
          border-zinc-700
          "

        >

          <p className="text-red-500 font-bold">

            {p.nex}

          </p>

          <p className="font-bold mt-2">

            {p.nome}

          </p>

          <p className="text-zinc-400 mt-2">

            {p.descricao}

          </p>

        </div>

      ))

    )

    :

    (

      <div className="
      bg-zinc-800
      rounded-lg
      p-4
      ">

        Nenhum poder desbloqueado.

      </div>

    )

  }

</div>

<h3 className="
mt-8
text-xl
font-bold
text-red-500
">

  Progressão da Trilha

</h3>

<div className="
mt-4
space-y-3
">

  {

    personagem.poderesTrilha?.length > 0 ?

    (

      personagem.poderesTrilha.map((p:any)=>(

        <div

          key={p.nex}

          className="
          bg-zinc-800
          rounded-lg
          p-4
          border
          border-zinc-700
          "

        >

          <p className="text-red-500 font-bold">

            {p.nex}

          </p>

          <p className="font-bold mt-2">

            {p.nome}

          </p>

          <p className="text-zinc-400 mt-2">

            {p.descricao}

          </p>

        </div>

      ))

    )

    :

    (

      <div className="
      bg-zinc-800
      rounded-lg
      p-4
      ">

        Nenhum poder de trilha desbloqueado.

      </div>

    )

  }

</div>
          <h3 className="
          mt-8
          text-xl
          font-bold
          text-red-500
          ">

            Atributos

          </h3>

          <div className="
          mt-4
          grid
          grid-cols-5
          gap-3
          ">

            {

              Object.entries(

                personagem.atributos || {}

              ).map(

                ([atributo,valor])=>(

                  <div

                    key={atributo}

                    className="
                    bg-zinc-800
                    rounded-lg
                    p-3
                    text-center
                    "

                  >

                    <p className="
                    text-zinc-400
                    text-sm
                    ">

                      {atributo}

                    </p>

                    <p className="
                    text-2xl
                    font-bold
                    ">

                      {String(valor)}

                    </p>

                  </div>

                )

              )

            }

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

}:any){

  return(

    <div className="
    bg-zinc-800
    rounded-lg
    p-3
    text-center
    ">

      <p className="text-zinc-500 text-sm">

        {nome}

      </p>

      <p className="
      text-xl
      font-bold
      ">

        {atual} / {max}

      </p>

      <div className="
      flex
      justify-center
      gap-2
      mt-3
      ">

        <button

          onClick={onMinus}

          className="
          bg-red-700
          px-3
          rounded
          "

        >

          -

        </button>

        <button

          onClick={onPlus}

          className="
          bg-green-700
          px-3
          rounded
          "

        >

          +

        </button>

      </div>

    </div>

  );

}