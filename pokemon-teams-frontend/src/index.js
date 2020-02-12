const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener('DOMContentLoaded', getAllCards())
document.addEventListener("DOMContentLoaded", getPokemons)

let pokemons = [] //global variable, available everywhere 

function getAllCards() {
	fetch(TRAINERS_URL)
		.then(response => response.json())
		.then(json => showAllCards(json))
}

function getPokemons() {
	fetch(POKEMONS_URL)
		.then(response => response.json())
		.then(json => {
			// console.log(json.data)
			pokemons = json.data //we're putting the json.data into the global 
			//pokemons array 
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
	//div.innerHTML = "hello" 

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
	let trainerID = button.setAttribute('data-trainer-id', `${card.id}`) //
	button.innerHTML = "Add Pokemon"
	button.id = "add-pokemon-button"
	div.append(button) 
		
	// let array = card.relationships.pokemon
	// let number = array.count

	button.addEventListener('click', (e) => {
		const numberOfPokemonsOnTeam = e.target.nextSibling.childElementCount
 		// console.log("on team:", numberOfPokemonsOnTeam)
 		if (numberOfPokemonsOnTeam < 6) {
			createNewPokemon(card.id, button.id)
			} else {
			console.log("too many, can't add more")
			//add reroute here, or put on screen 
		}
	})
	
	const ul = document.createElement('ul')
	div.append(ul)

	card.relationships.pokemon.data.forEach(pokemon => {
		let li = document.createElement('li')
		const pokemonName  = mapIDNumberToPokemons(pokemon.id).attributes.nickname 
		// li.innerHTML =  name 
		li.appendChild(document.createTextNode(pokemonName))
		
		let releaseButton = document.createElement("button")
		releaseButton.appendChild(li)
		releaseButton.innerHTML = "Release"
		releaseButton.className = "release-button"
		// releaseButton.id = pokemon.id 
		releaseButton.setAttribute('data-pokemon-id', `${pokemon.id}`)
		
		releaseButton.addEventListener('click', (e) => {
			releasePokemon(card.id, pokemon.id, e)
		})
		li.appendChild(releaseButton)
		ul.appendChild(li)
	})
}
const createNewPokemon = (trainer_id, button) => {   
	console.log("here", trainer_id, button)

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
		.then(data => console.log(data))
		.then(data => renderNewPokemon(trainer, data))

}

// object.trainer.id

const renderNewPokemon = (trainer, object => {
	console.log("trainer")
	const trainerBox = document.querySelector(`[data-id="${trainer}"] ul`)
	const li = document.createElement('li')
	li.innerHTML = `${object.nickname} -${object.species}`
	
	let releaseButton = document.createElement("button")
	releaseButton.className = "release-button"
	releaseButton.setAttribute('data-pokemon-id', `${pokemon.id}`)
	releaseButton.innerHTML = "Release"
	li.appendChild(releaseButton)
		
	releaseButton.addEventListener('click', (e) => {
			releasePokemon(card.id, pokemon.id, e)
	})
	
	trainerBox.appendChild(li)
}

const mapIDNumberToPokemons = (id) => {
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


// function morePokemon(e) {
//     if (e.target.nextSibling.childElementCount < 6) {
//         fetchPokemon(e.target.attributes[0].value)
//     }
