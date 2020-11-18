const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")

function ready() {
fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(data => {
  		data.forEach(trainer => renderTrainer(trainer))
  	})
}

const renderTrainer = (trainerHash) => {
	const div = document.createElement("div")
	const p = document.createElement("p")
	const button = document.createElement("button")
	const ul = document.createElement("ul")

	div.setAttribute("class", "card")
	div.setAttribute("data-id", trainerHash["id"])
	p.innerHTML = trainerHash.name
	button.setAttribute("data-trainer-id", trainerHash.id)
	button.innerHTML = "Add Pokemon"

	div.appendChild(p)
	div.appendChild(button)
	div.appendChild(ul)


	main.appendChild(div)

}

document.addEventListener("DOMContentLoaded", ready);

