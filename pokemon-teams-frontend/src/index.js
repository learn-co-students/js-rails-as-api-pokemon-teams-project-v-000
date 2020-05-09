const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector("main") //where the pokemons go in html

document.addEventListener("DOMContentLoaded", () => { loadTrainers()});


function loadTrainers() {
    return fetch(TRAINERS_URL)
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            //console.log(json) //array of hashes
            let trainersData = json
            trainersData["data"].forEach(trainer => showTrainers(trainer)) //object is not an array...array prototype
          });
} 


function showTrainers(trainer){

    let cardDiv = document.createElement("div")
    cardDiv.className = "card"
    cardDiv.setAttribute("data-id", `${trainer["id"]}`)
    main.appendChild(cardDiv)

    let pName = document.createElement("p")
    pName.innerText = trainer["attributes"]["name"]
    cardDiv.appendChild(pName)

    let addButton = document.createElement("button")
    addButton.setAttribute("data-trainer-id", `${trainer["id"]}`)
    addButton.innerText = "Add Pokemon"
    cardDiv.appendChild(addButton) 
    //need to make it click 
    //addButton.addEventListener("click", function() {createPokemon(trainer["id"])})
    addButton.addEventListener("click", createPokemon)


    let ulTag = document.createElement("ul")
    cardDiv.appendChild(ulTag)

    //showpokemon
    trainer["attributes"]["pokemons"].forEach(pokemon => showPokemon(pokemon))   
}

function showPokemon(pokemon) {
    let trainerUl = document.querySelector(`div[data-id="${pokemon.trainer_id}"] > ul`) //need to retrieve the ul from above
    let pokeListing = document.createElement("li")
    let pokeName = pokemon["nickname"]
    let pokeSpecies = pokemon["species"]
    pokeListing.innerText = `${pokeName} (${pokeSpecies})`
    trainerUl.appendChild(pokeListing)

    let releaseButton = document.createElement("button")
    releaseButton.setAttribute("class", "release")
    releaseButton.setAttribute("data-pokemon-id", pokemon.id)
    releaseButton.innerText = "Release"
    //need to add click event

    pokeListing.append(releaseButton)

}



const createPokemon = (e) => {
    //e.preventDefault()
    e.preventDefault()
   
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
        body: JSON.stringify({trainer_id: e.target.dataset.trainerId})
    }

    fetch(POKEMONS_URL, configObj)
        .then(res => res.json())
        .then(json => {
            showPokemon(json)
            //console.log(json)
        })
}