"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { origins } from "@/app/data/origins";
import { classes } from "@/app/data/classes";
import { statusClasses } from "@/app/data/status";

export default function NewCharacter() {

  const router = useRouter();

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



  function changeAttribute(
    atributo: string,
    valor: string
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





  function createCharacter() {


    if (!name.trim()) {

      alert("Digite o nome do personagem");

      return;

    }




    const origemSelecionada = origins.find(
      (item) => item.name === origin
    );




    const classeSelecionada = classes.find(
      (item) => item.name === className
    );





    const statusBase =
      statusClasses[
        className as keyof typeof statusClasses
      ];





    const valorNex = Number(
      nex.replace("%", "")
    );




    const nivelNex = valorNex / 5;





    const pv = statusBase
      ? statusBase.pvBase +
        (attributes.VIG * 2) +
        (nivelNex * 4)
      : 0;



    const pe = statusBase
      ? statusBase.peBase +
        attributes.PRE +
        nivelNex
      : 0;




    const san = statusBase
      ? statusBase.sanBase +
        (nivelNex * 2)
      : 0;







    const personagem = {


      nome: name,


      origem: origin || "Não definido",


      classe: className || "Não definido",


      nex,



      pv,


      pe,


      san,



      pericias:
      [
        ...(origemSelecionada?.skills || []),
        ...(classeSelecionada?.skills || [])
      ],




      poder:
        origemSelecionada?.power || "Nenhum",





      habilidadeClasse:
        classeSelecionada?.ability || "Nenhuma",




      descricaoClasse:
        classeSelecionada?.description || "",





      atributos: attributes,


    };







    localStorage.setItem(
      "personagem",
      JSON.stringify(personagem)
    );





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

              onChange={(e)=>setName(e.target.value)}

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



              <select

                value={origin}

                onChange={(e)=>setOrigin(e.target.value)}

                className="
                w-full
                mt-2
                bg-zinc-800
                border
                border-zinc-700
                rounded-lg
                p-3
                "

              >

                <option value="">
                  Escolha uma origem
                </option>


                {origins.map((item)=>(

                  <option
                    key={item.name}
                    value={item.name}
                  >
                    {item.name}
                  </option>

                ))}


              </select>


            </div>






            <div>


              <label className="text-zinc-400">
                Classe
              </label>



              <select

                value={className}

                onChange={(e)=>setClassName(e.target.value)}

                className="
                w-full
                mt-2
                bg-zinc-800
                border
                border-zinc-700
                rounded-lg
                p-3
                "

              >


                <option value="">
                  Escolha uma classe
                </option>



                {classes.map((item)=>(

                  <option
                    key={item.name}
                    value={item.name}
                  >
                    {item.name}
                  </option>


                ))}



              </select>


            </div>


          </div>







          <div>


            <label className="text-zinc-400">
              NEX
            </label>



            <select

              value={nex}

              onChange={(e)=>setNex(e.target.value)}

              className="
              w-full
              mt-2
              bg-zinc-800
              border
              border-zinc-700
              rounded-lg
              p-3
              "

            >

              {Array.from(
                {length:19},
                (_,i)=>(

                  <option
                    key={(i+1)*5}
                    value={`${(i+1)*5}%`}
                  >
                    {(i+1)*5}%
                  </option>

                )
              )}


              <option value="99%">
                99%
              </option>


            </select>


          </div>








          <h2 className="text-xl font-bold text-red-500 pt-4">
            Atributos
          </h2>


          <p className="text-zinc-500 text-sm">
            Valor permitido: 0 até 5
          </p>






          <div className="grid grid-cols-5 gap-3">


            {Object.keys(attributes).map((atributo)=>(


              <div key={atributo}>


                <label className="text-sm text-zinc-400">
                  {atributo}
                </label>



                <input

                  type="number"

                  min="0"

                  max="5"

                  value={
                    attributes[
                      atributo as keyof typeof attributes
                    ]
                  }


                  onChange={(e)=>{

                    const valor = Number(e.target.value);


                    if(valor >=0 && valor <=5){

                      changeAttribute(
                        atributo,
                        e.target.value
                      );

                    }

                  }}


                  onKeyDown={(e)=>{

                    if(
                      e.key==="-" ||
                      e.key==="+" ||
                      e.key==="e"
                    ){

                      e.preventDefault();

                    }

                  }}


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