"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { origins } from "@/app/data/origins";
import { classes } from "@/app/data/classes";
import { calcularStatus } from "@/app/data/system";


export default function EditCharacter() {


  const router = useRouter();

  const params = useParams();



  const [idPersonagem,setIdPersonagem] = useState("");

  const [carregando,setCarregando] = useState(true);



  const [name,setName] = useState("");

  const [image,setImage] = useState("");

  const [origin,setOrigin] = useState("");

  const [className,setClassName] = useState("");

  const [nex,setNex] = useState("5%");



  const [attributes,setAttributes] = useState({

    FOR:1,
    AGI:1,
    INT:1,
    PRE:1,
    VIG:1,

  });





  useEffect(()=>{


    const id = String(params.id);



    const dados = localStorage.getItem(
      "personagens"
    );



    if(!dados){

      setCarregando(false);

      return;

    }




    const lista = JSON.parse(dados);





    const personagem = lista.find(

      (item:any)=>

        item.id === id

    );





    if(personagem){


      setIdPersonagem(personagem.id);


      setName(
        personagem.nome || ""
      );


      setImage(
        personagem.imagem || ""
      );


      setOrigin(
        personagem.origem || ""
      );


      setClassName(
        personagem.classe || ""
      );


      setNex(
        personagem.nex || "5%"
      );



      setAttributes(

        personagem.atributos || {

          FOR:1,
          AGI:1,
          INT:1,
          PRE:1,
          VIG:1,

        }

      );


    }





    setCarregando(false);



  },[params.id]);







  function handleImage(
    e:React.ChangeEvent<HTMLInputElement>
  ){


    const arquivo = e.target.files?.[0];



    if(!arquivo){

      return;

    }



    const leitor = new FileReader();




    leitor.onload = ()=>{


      setImage(
        String(leitor.result)
      );


    };



    leitor.readAsDataURL(arquivo);


  }
  function salvarAlteracao(){



    const dados = localStorage.getItem(
      "personagens"
    );



    if(!dados){

      return;

    }



    const lista = JSON.parse(dados);





    const {pv,pe,san} = calcularStatus(

      className,

      attributes,

      nex

    );







    const novaLista = lista.map(

      (personagem:any)=>{



        if(personagem.id === idPersonagem){



          return {



            ...personagem,



            nome:name.trim(),



            imagem:image,



            origem:
              origin || "Não definido",



            classe:
              className || "Não definido",



            nex,





            pv,

            pe,

            san,





            // mantém valores atuais se já existirem

            pvAtual:
              personagem.pvAtual ?? pv,



            peAtual:
              personagem.peAtual ?? pe,



            sanAtual:
              personagem.sanAtual ?? san,






            atributos:attributes,



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

      `/character/${idPersonagem}`

    );



  }












  function alterarAtributo(

    atributo:string,

    valor:string

  ){



    let numero = Number(valor);




    if(numero < 0){

      numero = 0;

    }




    if(numero > 5){

      numero = 5;

    }






    setAttributes({

      ...attributes,

      [atributo]:numero,

    });



  }
  if(carregando){


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







  if(!idPersonagem){


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
    p-5
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





          <div>

            <label className="text-zinc-400">
              Nome do personagem
            </label>


            <input

              value={name}

              onChange={(e)=>
                setName(e.target.value)
              }


              className="
              w-full
              mt-2
              bg-zinc-800
              border
              border-zinc-700
              rounded-lg
              p-3
              "

            />


          </div>







          <div>


            <label className="text-zinc-400">
              Imagem do personagem
            </label>



            <input

              type="file"

              accept="image/*"

              onChange={handleImage}


              className="
              w-full
              mt-2
              bg-zinc-800
              border
              border-zinc-700
              rounded-lg
              p-3
              "

            />





            {
              image && (

                <div className="
                flex
                justify-center
                mt-4
                ">


                  <img

                    src={image}

                    alt={name}

                    className="
                    w-40
                    h-40
                    object-cover
                    rounded-lg
                    border
                    border-zinc-700
                    "

                  />


                </div>

              )
            }


          </div>








          <select

            value={origin}

            onChange={(e)=>
              setOrigin(e.target.value)
            }


            className="
            w-full
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


            {
              origins.map((item)=>(

                <option

                  key={item.name}

                  value={item.name}

                >

                  {item.name}

                </option>

              ))
            }


          </select>








          <select

            value={className}

            onChange={(e)=>
              setClassName(e.target.value)
            }


            className="
            w-full
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


            {
              classes.map((item)=>(

                <option

                  key={item.name}

                  value={item.name}

                >

                  {item.name}

                </option>

              ))
            }


          </select>









          <select

            value={nex}

            onChange={(e)=>
              setNex(e.target.value)
            }


            className="
            w-full
            bg-zinc-800
            border
            border-zinc-700
            rounded-lg
            p-3
            "

          >


            {
              Array.from(
                {length:19},
                (_,i)=>(

                  <option

                    key={i}

                    value={`${(i+1)*5}%`}

                  >

                    {(i+1)*5}%

                  </option>

                )
              )
            }



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



            {
              Object.keys(attributes).map(

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


                )

              )
            }



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