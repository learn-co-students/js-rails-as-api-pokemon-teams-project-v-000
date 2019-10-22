const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {
    fetchTrainers()
})

function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(json => addTrainersToDom(json))
}

function addTrainersToDom(json) {
    let main = document.getElementsByTagName("main")[0]
    json.data.forEach(element => {
        let div = document.createElement("div")
        div.className = "card"
        let addButton = document.createElement("button")
        addButton.innerText = "Add a new Pokemon"
        addButton.id = element.id
        addButton.addEventListener("click", function(e) {
            addPokemonButton(e.target.id, div.children[2])
        })
        let p= document.createElement("p")
        p.innerText = element.attributes.name
        let ul = document.createElement("ul")
        div.append(p, addButton, ul)
        main.appendChild(div)
        addPokemonToDom(element.attributes.pokemons, ul)

    });
}

function addPokemonToDom(pokemons, ul) {
    console.log("pokemons", pokemons)
    pokemons.forEach(element => {

       let li = addPokemon(element)
       console.log("li", li)
       ul.appendChild(li)
   });

}

function addPokemon(element) {

    let li = document.createElement("li")
       li.innerText = `${element.nickname} (${element.species})`
       let button = document.createElement("button")
       li.id = `pokemon-${element.id}`
       button.id = element.id
       button.innerText = "Release Me!"
       button.className = "release"
       li.appendChild(button)


        button.addEventListener("click", function(e) {

            removePokemonButton(e)
        })

        return li
}
function addPokemonButton(trainer_id, ul) {
    if(ul.children.length < 6 ) {

        fetch(POKEMONS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                trainer_id
            })
        })
        .then(response => response.json())
        .then(json => addPokemonToDom([json.data.attributes], ul))
    }
}
    function removePokemonButton(e) {
    let id = e.target.id
    fetch(`${POKEMONS_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
    .then(response => response.json())
    .then(json => document.getElementById(`pokemon-${json.data.id}`).remove())
}
