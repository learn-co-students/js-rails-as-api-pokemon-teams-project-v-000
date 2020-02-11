const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

window.onload = (fetchTrainers(TRAINERS_URL) )

function fetchTrainers(TRAINERS_URL){
fetch(TRAINERS_URL)
.then(response=> {return response.json()})
.then(objs => {objs.forEach(obj => { cardCreation(obj)});})
.catch((error)=>{console.log(error)})
}

function cardCreation(obj){
        const pokemons = obj.pokemons
        
  // sets up the trainer info and actions
        const text = obj.name
        const main = document.querySelector("main");
        const div = document.createElement("div");
        const p = document.createElement("p");
        const add_button = document.createElement("button")
        const ul = document.createElement("ul");
        div.setAttribute("class", "card");
        div.setAttribute("data-id", obj.id);
        p.innerText = text;
        add_button.setAttribute("data-trainer-id", obj.id);
        add_button.innerText = "Add Pokemon"
    
            // sets up the pokemons info and actions
        
        pokemons.forEach(poke => {
          const release_button = document.createElement("button");
          release_button.setAttribute("class","release")
          release_button.setAttribute("data-pokemon-id","pokemon-id-goes-here")
          release_button.innerText = "Release"
          const li = document.createElement("li") 
          li.innerText = (`${poke.nickname}  (${poke.species})`)
          li.append(release_button);
          ul.appendChild(li);  
        });
             

    // putting everything together
        div.appendChild(p);
        div.appendChild(add_button);
        div.appendChild(ul);
        main.appendChild(div);
}




 