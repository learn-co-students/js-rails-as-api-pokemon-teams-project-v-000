const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
var main = document.getElementsByTagName("MAIN")[0]

function returnTrainers() {
  fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(data => {
    displayTrainers(data) 
  })
  .catch(error => console.error(error))
}


document.addEventListener('DOMContentLoaded', () => {
  returnTrainers()
})

function displayTrainers(trainers) {
  trainers.forEach(trainer => {
    var ul = document.createElement("ul")
    pokemons = trainer.pokemons
    var teamSize = pokemons.length
    ul.innerText = `${trainer.name}'s Pokemon:`
    main.appendChild(ul)
    var plus = document.createElement("BUTTON")
    plus.innerText = "Add a new Pokemon"
    plus.classList.add("invite")
    ul.appendChild(plus)
    plus.addEventListener("click", (e) => {
      e.preventDefault
      if(teamSize < 6) {
        addNewPok(e.target.attributes[0].value, ul, teamSize)
        teamSize +=1  
      } else {
        alert("your team is already full!")
      } 
    })
    pokemons.forEach(pokemon => {
      addPokLine(pokemon, ul, teamSize)
    })
  })
}

function addPokLine(pokemon, ul, teamSize) {

  var ol = document.createElement("OL") 
  ol.innerText = `${pokemon.nickname}` + " (" + `${pokemon.species}` + ")"  
  ol.id = `pokemon-${pokemon.id}`
  var cancel = document.createElement("BUTTON")
  cancel.classList.add("release")
  cancel.innerText = "X"
  ol.appendChild(cancel)
  ul.appendChild(ol)
  cancel.addEventListener("click", (e) => {
    removePokLine(e, ul, ol, teamSize)
  })
}

function addNewPok(trainer_id, ul, teamSize) {
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          trainer_id
        })
    };

    fetch(POKEMONS_URL, configObj)
      .then(res => res.json())
      .then(obj => addPokLine(obj, ul, teamSize))
      
}

function removePokLine(e, ul, ol, teamSize) {
  e.preventDefault
    teamSize -=1
  //alert(`${teamSize}`)
  let id = e.target.id
    fetch(`${POKEMONS_URL}/${id}`, {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json", 
            "Accept": "application/json"
        } 
    })
  ul.removeChild(ol)
}
