"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { origins } from "@/app/data/origins";
import { classes } from "@/app/data/classes";
import { trilhas } from "@/app/data/trilhas";
import { calcularStatus } from "@/app/data/system";


export default function NewCharacter() {


  const router = useRouter();



  const [name,setName] = useState("");

  const [player,setPlayer] = useState("");

  const [age,setAge] = useState("");

  const [appearance,setAppearance] = useState("");

  const [history,setHistory] = useState("");

  const [notes,setNotes] = useState("");



  const [image,setImage] = useState("");



  const [origin,setOrigin] = useState("");

  const [className,setClassName] = useState("");

  const [trilha,setTrilha] = useState("");

  const [nex,setNex] = useState("5%");



  const [attributes,setAttributes] = useState({

    FOR:1,
    AGI:1,
    INT:1,
    PRE:1,
    VIG:1,

  });




  function changeAttribute(
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

      [atributo]:numero

    });


  }






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





  function createCharacter(){


    const nomeFinal = name.trim();



    if(!nomeFinal){

      alert("Digite o nome do personagem");

      return;

    }



    if(!className){

      alert("Selecione uma classe.");

      return;

    }




    const origemSelecionada = origins.find(

      item => item.name === origin

    );



    const classeSelecionada = classes.find(

      item => item.name === className

    );



    const trilhaSelecionada = trilhas.find(

      item => 
        item.nome === trilha &&
        item.classe === className

    );





    const {
      pv,
      pe,
      san

    } = calcularStatus(

      className,

      attributes,

      nex

    );





    const personagem = {


      id:crypto.randomUUID(),


      nome:nomeFinal,


      jogador:player,


      idade:age,


      aparencia:appearance,


      historia:history,


      anotacoes:notes,


      imagem:image,



      origem:
        origin || "Não definido",



      classe:
        className || "Não definido",



      trilha:
        trilha || "Sem trilha",



      nex,



      pv,

      pe,

      san,



      pvAtual:pv,

      peAtual:pe,

      sanAtual:san,



      poderesDesbloqueados:[],


      poderesTrilha:
        trilhaSelecionada?.poderes || [],



      pericias:[

        ...(origemSelecionada?.skills || []),

        ...(classeSelecionada?.skills || [])

      ],



      poderOrigem:

        origemSelecionada?.power || "Nenhum",



      habilidadeClasse:

        classeSelecionada?.ability || "Nenhuma",



      descricaoClasse:

        classeSelecionada?.description || "",



      atributos:attributes,


    };
	    const personagensSalvos = JSON.parse(

      localStorage.getItem("personagens") || "[]"

    );



    personagensSalvos.push(personagem);



    localStorage.setItem(

      "personagens",

      JSON.stringify(personagensSalvos)

    );



    router.push(

      `/character/${personagem.id}`

    );


  }






  const trilhasDisponiveis = trilhas.filter(

    item =>

      item.classe === className

  );







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
        tracking-widest
        text-center
        ">

          NOVO PERSONAGEM

        </h1>





        <p className="
        text-zinc-500
        text-center
        mt-3
        ">

          Crie sua ficha de investigação paranormal

        </p>






        <div className="
        mt-10
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

              placeholder="Ex: Tsurugi"

            />


          </div>







          <div>

            <label className="text-zinc-400">

              Jogador

            </label>


            <input

              value={player}

              onChange={(e)=>
                setPlayer(e.target.value)
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

              placeholder="Nome do jogador"

            />


          </div>







          <div>

            <label className="text-zinc-400">

              Idade

            </label>


            <input

              value={age}

              onChange={(e)=>
                setAge(e.target.value)
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

              placeholder="Ex: 25"

            />


          </div>







          <div>

            <label className="text-zinc-400">

              Aparência

            </label>


            <textarea

              value={appearance}

              onChange={(e)=>
                setAppearance(e.target.value)
              }


              className="
              w-full
              mt-2
              bg-zinc-800
              border
              border-zinc-700
              rounded-lg
              p-3
              min-h-24
              "

              placeholder="Descreva a aparência"

            />


          </div>







          <div>

            <label className="text-zinc-400">

              História

            </label>


            <textarea

              value={history}

              onChange={(e)=>
                setHistory(e.target.value)
              }


              className="
              w-full
              mt-2
              bg-zinc-800
              border
              border-zinc-700
              rounded-lg
              p-3
              min-h-32
              "

              placeholder="História do personagem"

            />


          </div>







          <div>

            <label className="text-zinc-400">

              Anotações

            </label>


            <textarea

              value={notes}

              onChange={(e)=>
                setNotes(e.target.value)
              }


              className="
              w-full
              mt-2
              bg-zinc-800
              border
              border-zinc-700
              rounded-lg
              p-3
              min-h-24
              "

              placeholder="Informações extras"

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

                    alt="Preview"

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








          <div className="
          grid
          grid-cols-2
          gap-4
          ">


            <select

              value={origin}

              onChange={(e)=>
                setOrigin(e.target.value)
              }


              className="
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

              onChange={(e)=>{

                setClassName(e.target.value);

                setTrilha("");

              }}


              className="
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


          </div>









          <select

            value={trilha}

            onChange={(e)=>
              setTrilha(e.target.value)
            }


            disabled={!className}


            className="
            w-full
            bg-zinc-800
            border
            border-zinc-700
            rounded-lg
            p-3
            disabled:opacity-50
            "

          >

            <option value="">

              Escolha uma trilha

            </option>



            {
              trilhasDisponiveis.map((item)=>(

                <option

                  key={item.nome}

                  value={item.nome}

                >

                  {item.nome}

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
              Object.keys(attributes).map((atributo)=>(


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

                    changeAttribute(

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


              ))
            }


          </div>









          <button

            onClick={createCharacter}


            className="
            w-full
            bg-red-700
            hover:bg-red-600
            rounded-lg
            py-3
            font-bold
            "

          >

            Salvar Personagem


          </button>






        </div>



      </div>



    </main>


  );


}