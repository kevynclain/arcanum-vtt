"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function CharactersPage(){

  const router = useRouter();

  const [personagens,setPersonagens] = useState<any[]>([]);



  function carregarPersonagens(){

    const dados = localStorage.getItem("personagens");


    if(dados){

      setPersonagens(
        JSON.parse(dados)
      );

    }else{

      setPersonagens([]);

    }

  }





  useEffect(()=>{

    carregarPersonagens();

  },[]);





  function excluirPersonagem(id:string){


    const novaLista = personagens.filter(

      (p)=>

        p.id !== id

    );



    localStorage.setItem(

      "personagens",

      JSON.stringify(novaLista)

    );



    setPersonagens(novaLista);


  }





  return (


    <main className="
    min-h-screen
    bg-[#08080a]
    text-white
    p-8
    ">


      <div className="max-w-5xl mx-auto">



        <h1 className="
        text-4xl
        font-black
        text-red-600
        text-center
        tracking-widest
        ">

          ARCANUM

        </h1>





        <button

          onClick={()=>router.push("/character/new")}

          className="
          mt-8
          w-full
          bg-red-700
          hover:bg-red-600
          rounded-lg
          py-3
          font-bold
          "

        >

          + Criar personagem

        </button>






        <div className="mt-8">



        {
          personagens.length === 0 ?


          (

            <p className="
            text-zinc-400
            text-center
            ">

              Nenhum personagem criado

            </p>

          )


          :


          (

            personagens.map((p)=>(



              <div

                key={p.id}

                className="
                bg-zinc-900
                border
                border-zinc-700
                rounded-lg
                p-5
                mt-4
                "

              >





                {
                  p.imagem && (

                    <img

                      src={p.imagem}

                      alt={p.nome}

                      className="
                      w-32
                      h-32
                      object-cover
                      rounded-lg
                      mx-auto
                      "

                    />

                  )

                }






                <h2 className="
                text-2xl
                font-bold
                text-center
                mt-4
                ">

                  {p.nome}

                </h2>





                <p className="
                text-zinc-400
                text-center
                mt-2
                ">

                  {p.classe}

                  {" • "}

                  {p.nex}

                </p>







                <div className="
                flex
                gap-3
                mt-5
                ">



                  <button

                    onClick={()=>

                      router.push(
                        `/character/${p.id}`
                      )

                    }

                    className="
                    flex-1
                    bg-red-700
                    hover:bg-red-600
                    rounded-lg
                    py-2
                    font-bold
                    "

                  >

                    Abrir

                  </button>







                  <button

                    onClick={()=>


                      router.push(
                        `/character/edit/${p.id}`
                      )


                    }

                    className="
                    flex-1
                    bg-zinc-700
                    hover:bg-zinc-600
                    rounded-lg
                    py-2
                    font-bold
                    "

                  >

                    Editar

                  </button>








                  <button

                    onClick={()=>excluirPersonagem(p.id)}

                    className="
                    flex-1
                    bg-zinc-800
                    hover:bg-zinc-700
                    rounded-lg
                    py-2
                    font-bold
                    "

                  >

                    Excluir

                  </button>




                </div>





              </div>



            ))

          )


        }


        </div>




      </div>



    </main>


  );

}