const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function() {
	fetchTrainers();
})

function fetchTrainers() {
	fetch(TRAINERS_URL)
		.then(res => res.json())
		.then(obj => { createTrainer(obj) })
}


function createTrainer(obj){
  obj.forEach(trainer => renderTrainer(trainer))
}

function renderTrainer(trainer){
  const main = document.querySelector('main')

  const div = document.createElement('div')
	div.setAttribute("class", "card")
	div.setAttribute("data-id", `${trainer.id}`)

  const p = document.createElement('p')
  p.innerHTML = `${trainer.name}`
  div.appendChild(p)

  const addbtn = document.createElement('button')
	addbtn.setAttribute("data-trainer-id", `${trainer.id}`)
	addbtn.innerHTML = "Add Pokemon"
	addbtn.addEventListener('click', morePokemon)
	div.appendChild(addbtn)

  const ul = document.createElement('ul')
	div.appendChild(ul)

  trainer.pokemons.forEach(pokemon => {

  		let li = createPokemon(pokemon);

  		ul.appendChild(li);
  	})

  	main.appendChild(div)
  }
  function morePokemon(e) {
	if (e.target.nextSibling.childElementCount < 6) {
		fetchPokemon(e.target.attributes[0].value)
	}
}
function fetchPokemon(trainer_id) {

	let trainerObj = {
		"trainer_id": trainer_id
	}

	let configObj = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(trainerObj)
	};

	fetch(POKEMONS_URL, configObj)
		.then(res => res.json())
		.then(obj => renderPokemon(obj))
}
