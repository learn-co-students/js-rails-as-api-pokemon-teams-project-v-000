const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")

document.addEventListener("DOMContentLoaded", () => loadTrainers())



/*
  let a = 1;
  const promise = new Promise((resolve, reject) {
    if(a === 1) {
    reject('variable a is less than 2')
  } else {
  resolve('variable a is one')
}
  })

*/


const loadTrainers = () => {
     // res.body is a readable stream;
     // res.json() returns a promise
     // when that promise resolves it ps passed to the next .then()
     // where you have the data
    fetch(TRAINERS_URL)
      .then(res => res.json())
      .then(res => {
        res.forEach(trainer => renderTrainer(trainer))
      })
      // .finally(() => console.log('clean up'))
}

const renderTrainer = (trainerHash) => {
  const div = document.createElement("div")
  const p = document.createElement("p")
  const button = document.createElement("button")
  const ul = document.createElement("ul")

  div.setAttribute("class", "card")
  div.setAttribute("data-id", trainerHash.id)
  p.innerHTML = trainerHash.name

  button.setAttribute("data-trainer-id", trainerHash.id)
  button.innerHTML = "Add Pokemon"
  // button.addEventListener("click", createPokemon)

  div.appendChild(p)
  div.appendChild(button)
  div.appendChild(ul)

  main.appendChild(div)
  trainerHash.pokemons.forEach(pokemon => renderPokemon(pokemon))
}

  const renderPokemon = (pokemon) => {
    // const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
    const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
    const li = document.createElement("li")
    li.innerHTML = `${pokemon.nickname} (${pokemon.species})`

    const button = document.createElement("button")

    button.setAttribute("class", "release")
    button.setAttribute("data-pokemon-id", `pokemon.id`)
    button.innerHTML = "Release"
    button.addEventListener("click", deletePokemon)


    ul.appendChild(li)
    li.appendChild(button)

    const createPokemon = (e) => {
      e.preventDefault()
      const configObj = {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "Accept" : "application/json"
        },
        body: JSON.stringify({trainer_id: 2})
      }
    }


// because both this and the destroy method are invoked on event listeners, so they'll
// get the event object as an argument
    const deletePokemon = (e) => {
      e.preventDefault()

    }

    fetch(`${POKEMONS_URL}/e.target.dataset.pokemonId`, configObj)
    e.target.parentElement.remove()

  }




  //
  // let b1 = document.getElementsByClassName("release")[0]
  // let div2 = document.getElementsByClassName("card")[0]
  // div.addEventListener("click", clickFunction())
  //
  // const clickFunction = (e) => {
  //   var val = e
  //   console.log(val)
  // }


// is the 'trainer' being passed to renderTrainer the same as trainerHash on line 16?
// is a js object the same as a hash or does it just look like one? it was described in the
// lab as anything stored between {}?
// difference between innerHTML and innerText if anything
// what's going on with the debugger? why does hightling the url in the url bar and refreshing
// have a different effect than just refreshing or clicking forward on the debugger play icon?
