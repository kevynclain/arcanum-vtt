"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { origins } from "@/app/data/origins";
import { classes } from "@/app/data/classes";
import { calcularStatus } from "@/app/data/system";

export default function EditCharacter() {

  const router = useRouter();
  const params = useParams();


  const [nomeOriginal, setNomeOriginal] = useState("");

  const [carregando, setCarregando] = useState(true);


  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [className, setClassName] = useState("");
  const [nex, setNex] = useState("5%");


  const [attributes, setAttributes] = useState({
    FOR: 1,
    AGI: 1,
    INT: 1,
    PRE: 1,
    VIG: 1,
  });



  useEffect(() => {

    const id = decodeURIComponent(
      String(params.id)
    );


    const dados = localStorage.getItem(
      "personagens"
    );


    if (!dados) {

      setCarregando(false);

      return;

    }


    const lista = JSON.parse(dados);



    const personagem = lista.find(
      (item: any) =>
        item.nome.toLowerCase() === id.toLowerCase()
    );



    if (personagem) {

      setNomeOriginal(personagem.nome);

      setName(personagem.nome);

      setOrigin(personagem.origem);

      setClassName(personagem.classe);

      setNex(personagem.nex);

      setAttributes(
        personagem.atributos
      );

    }


    setCarregando(false);


  }, [params.id]);






  function salvarAlteracao() {


    const dados = localStorage.getItem(
      "personagens"
    );


    if (!dados) {
      return;
    }


    const lista = JSON.parse(dados);



    const { pv, pe, san } = calcularStatus(
      className,
      attributes,
      nex
    );



    const novaLista = lista.map(
      (personagem:any) => {


        if (
          personagem.nome.toLowerCase() === nomeOriginal.toLowerCase()
        ) {


          return {

            ...personagem,

            nome: name,

            origem: origin,

            classe: className,

            nex,

            pv,

            pe,

            san,

            atributos: attributes,

          };


        }


        return personagem;


      }
    );



    localStorage.setItem(
      "personagens",
      JSON.stringify(novaLista)
    );



    router.push(
      `/character/${name}`
    );

  }







  function alterarAtributo(
    atributo:string,
    valor:string
  ) {


    let numero = Number(valor);


    if (numero < 0) {
      numero = 0;
    }


    if (numero > 5) {
      numero = 5;
    }


    setAttributes({

      ...attributes,

      [atributo]: numero,

    });


  }







  if (carregando) {

    return (

      <main className="
      min-h-screen
      bg-[#08080a]
      text-white
      flex
      items-center
      justify-center
      ">

        Carregando personagem...

      </main>

    );

  }






  if (!nomeOriginal) {

    return (

      <main className="
      min-h-screen
      bg-[#08080a]
      text-white
      flex
      items-center
      justify-center
      ">

        Personagem não encontrado.

      </main>

    );

  }







  return (

    <main className="
    min-h-screen
    bg-[#08080a]
    text-white
    flex
    items-center
    justify-center
    ">


      <div className="w-full max-w-2xl">


        <h1 className="
        text-4xl
        font-black
        text-red-600
        text-center
        ">

          EDITAR PERSONAGEM

        </h1>




        <div className="
        mt-8
        bg-zinc-900
        border
        border-zinc-700
        rounded-lg
        p-6
        space-y-5
        ">


          <input

            value={name}

            onChange={(e)=>
              setName(e.target.value)
            }

            className="
            w-full
            bg-zinc-800
            rounded-lg
            p-3
            "

          />





          <select

            value={origin}

            onChange={(e)=>
              setOrigin(e.target.value)
            }

            className="
            w-full
            bg-zinc-800
            rounded-lg
            p-3
            "

          >

            {origins.map((item)=>(

              <option
                key={item.name}
                value={item.name}
              >

                {item.name}

              </option>

            ))}


          </select>






          <select

            value={className}

            onChange={(e)=>
              setClassName(e.target.value)
            }

            className="
            w-full
            bg-zinc-800
            rounded-lg
            p-3
            "

          >

            {classes.map((item)=>(

              <option
                key={item.name}
                value={item.name}
              >

                {item.name}

              </option>

            ))}


          </select>





          <select

            value={nex}

            onChange={(e)=>
              setNex(e.target.value)
            }

            className="
            w-full
            bg-zinc-800
            rounded-lg
            p-3
            "

          >

            {Array.from(
              {length:19},
              (_,i)=>{

                const valor =
                  (i + 1) * 5;


                return (

                  <option
                    key={valor}
                    value={`${valor}%`}
                  >

                    {valor}%

                  </option>

                );

              }

            )}



            <option value="99%">
              99%
            </option>


          </select>





          <h2 className="
          text-xl
          font-bold
          text-red-500
          ">

            Atributos

          </h2>





          <div className="
          grid
          grid-cols-5
          gap-3
          ">


            {Object.keys(attributes).map(
              (atributo)=>(


              <input

                key={atributo}

                type="number"

                min="0"

                max="5"

                value={
                  attributes[
                    atributo as keyof typeof attributes
                  ]
                }


                onChange={(e)=>
                  alterarAtributo(
                    atributo,
                    e.target.value
                  )
                }


                className="
                bg-zinc-800
                rounded-lg
                p-2
                text-center
                "

              />


            ))}


          </div>






          <button

            onClick={salvarAlteracao}

            className="
            w-full
            bg-red-700
            hover:bg-red-600
            rounded-lg
            py-3
            font-bold
            "

          >

            Salvar Alterações

          </button>




        </div>


      </div>


    </main>

  );

}