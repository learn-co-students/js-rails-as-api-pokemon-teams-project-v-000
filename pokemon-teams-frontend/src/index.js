const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function fetchTrainers(){
    return  fetch(myUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            let all = json.data;
        //    console.log(all);
           all.forEach( value => 
            {renderTrainers(value);}
           );
          
        });
 }

 function rendernewPokemon(data, thisUl){
     console.log(data)
     let li =  document.createElement("li");
     li.textContent = data.attributes.nickname
     let buttDel = document.createElement("button")
     buttDel.setAttribute('data-pokemon-id',data.id)
     buttDel.classList.add("release")
     buttDel.textContent = "Release"
       
     buttDel.addEventListener('click', e => { 
        deletePokemon(e)
    })

     li.append(buttDel)
     thisUl.append(li)

 }


function addPokemon(e){
    console.log(e.target)
    console.log(e.target.getAttribute("data-trainer-id")) //trainer

    let thisUl = e.target.parentElement.querySelector("ul")
    let countLi = e.target.parentElement.querySelectorAll("ul li").length 
    if (countLi < 5) {
            const formData = {
              trainer_id: e.target.getAttribute("data-trainer-id") //params
            }
            const configObj = {
                method: "POST",
                headers: { "Content-Type": "application/json",
                           "Accept": "application/json"
                         },

            body: JSON.stringify(formData)
            }

            fetch(myPokemonurl,configObj)
            .then(response => response.json())
            .then( object => { rendernewPokemon(object.data, thisUl) })
            .catch((reason)=> { console.log(reason)})
    } else {
        alert("Complete Team")
    }
}

function deletePokemon(e){
      console.log(e.target)

   
     let pokemonId= e.target.getAttribute("data-pokemon-id")
    
     console.log( pokemonId)    

        fetch(myP
            okemonurl+"/"+pokemonId, {method: "DELETE"})
            .then(e.target.parentElement.remove())  //remove li
            .catch((reason)=> { console.log(reason)})

            
}


function renderTrainers(set){
    let mainEle= document.querySelector("main")
    // console.log(set);
      let divEle =  document.createElement("div")
      divEle.classList.add("card")
      divEle.setAttribute('data-id',set.id)
      let pEle =  document.createElement("p")
      let buttAdd = document.createElement("button")
      buttAdd.setAttribute('data-trainer-id',set.id)
      buttAdd.textContent = "Add Pokemon"

      buttAdd.addEventListener("click", e => { 
              addPokemon(e)
      })           

      pEle.textContent = set.attributes.name;
      
      let ulEle = document.createElement("ul")
      
            let pokemonsAll = set.attributes.pokemons;
            for (const p of pokemonsAll){
                let buttDel = document.createElement("button")
                buttDel.setAttribute('data-pokemon-id',p.id)
                buttDel.classList.add("release")
                buttDel.textContent = "Release"
                
                buttDel.addEventListener('click', e => { 
                    deletePokemon(e)
                })

                // console.log(`pokemon `+ p.nickname);
                let liEle = document.createElement("li");
                liEle.textContent = p.nickname
                liEle.append(buttDel)
                ulEle.append(liEle)
            }
divEle.append(pEle)
divEle.append(buttAdd)
divEle.append(ulEle)
mainEle.append(divEle)

    
    
}
const myPokemonurl="http://127.0.0.1:3000/pokemons"
const myUrl= "http://127.0.0.1:3000/trainers";
fetchTrainers();


