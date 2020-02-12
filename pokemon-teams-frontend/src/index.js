const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let pokemons = []; 

document.addEventListener('DOMContentLoaded', () => {
	getAllCards()
	getPokemons()
})

//global variable, available everywhere 

function getAllCards() {
	fetch(TRAINERS_URL)
		.then(response => response.json())
		.then(json => showAllCards(json))
}

function getPokemons() {
	fetch(POKEMONS_URL)
		.then(response => response.json())
		.then(json => {
			pokemons = json.data // put json.data into  global pokemons array 
    })
}

const showAllCards = (cards) => {
	// console.log('pokemon: ', cards.data)
	cards.data.forEach(card => createTrainerCard(card))
}
const createTrainerCard = (card) => {
	//create div, with class and data -id 
	let div = document.createElement('div')
	div.setAttribute('class', 'card' )
	div.setAttribute('data-id', `${card.id}` )

	//attach div to main element in index.html
	main = document.getElementById("pokemon-teams")
	main.appendChild(div)


	// create p with trainer name 
	let p = document.createElement('p')
	p.innerHTML = `${card.attributes.name}`
	// console.log("name:", p)
	div.appendChild(p)

	//create add Pokemon button 
	let button = document.createElement('button')
	button.setAttribute('data-trainer-id', `${card.id}`) //refactor 
	button.innerHTML = "Add Pokemon"
	button.id = "add-pokemon-button"
	div.append(button) 
		
	button.addEventListener('click', (e) => {
		const numberOfPokemonsOnTeam = e.target.nextSibling.childElementCount
 		// console.log("on team:", numberOfPokemonsOnTeam)
 		if (numberOfPokemonsOnTeam < 6) {
			createNewPokemon(card.id, button.id)
			} else {
			alert("too many, can't add more")
		}
	})
	//create ul 
	const ul = document.createElement('ul')
	div.append(ul)

	//create individual cards for pokemon
	card.relationships.pokemon.data.forEach(pokemon => {
		let li = document.createElement('li')
		const pokemonName  = mapIDNumberToPokemons(pokemon.id).attributes.nickname 
		li.appendChild(document.createTextNode(pokemonName))
		
		let releaseButton = document.createElement("button")
		releaseButton.appendChild(li)
		releaseButton.innerHTML = "Release"
		releaseButton.className = "release-button"
		releaseButton.setAttribute('data-pokemon-id', `${pokemon.id}`)
		
		releaseButton.addEventListener('click', (e) => {
			releasePokemon(card.id, pokemon.id, e)
		})

		li.appendChild(releaseButton)
		ul.appendChild(li)
	})
}

const createNewPokemon = (trainer_id) => {   
	console.log("here", trainer_id)

	let trainer = {
		"trainer_id" : trainer_id
	} 

	let config = {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(trainer)
	}

	fetch(POKEMONS_URL, config)
		.then(response => response.json())
		.then(newPokemon => renderNewPokemon(trainer, newPokemon))
}

const renderNewPokemon = (trainer, newPokemon) => {
	console.group("renderNewPokemon")
	console.log("trainer:", trainer)
	console.log("new pokemon:", newPokemon)
	console.groupEnd()

	
	const trainerBox = document.querySelectorAll('[data-id="${trainer}"] ul' )
	console.log("trainerbox:", trainerBox)
	
	const li = document.createElement('li')
	li.innerHTML = `${newPokemon.nickname} - ${newPokemon.species}`
	let releaseButton = document.createElement("button")
	releaseButton.className = "release-button"
	releaseButton.setAttribute('data-pokemon-id', `${newPokemon.id}`)
	releaseButton.innerHTML = "Release"
	li.appendChild(releaseButton)

	releaseButton.addEventListener('click', (e) => {
		releasePokemon(trainer, newPokemon.id, e)
	})	
}

function mapIDNumberToPokemons(id) {
	let pokemonArray = pokemons.filter(pokemon => {
		return id === pokemon.id
	})
	return pokemonArray[0]
}

const releasePokemon = (trainerID, pokemonId, e) => {
	fetch(TRAINERS_URL + '/' + trainerID + '/pokemons/' + pokemonId, {
		method: 'DELETE'
		}).then(console.log(`${pokemonId} has been removed`))
	.then( () => deletePokemonFromPage(e) )
}

const deletePokemonFromPage = (e) => {
    let el = e.target.parentElement
    console.log(el)
	el.remove()
}