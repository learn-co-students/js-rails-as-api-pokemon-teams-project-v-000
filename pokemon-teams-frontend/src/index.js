const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


//user loads a page -- they see all trainers with their pokemon 
//user hits "Add pokemon" button, if they have space on their team, they get a new P 
//user hits "release pokemon" button on a specific Pok team
// that P is released from the team 

document.addEventListener('DOMContentLoaded', getAllCards())
document.addEventListener("DOMContentLoaded", getPokemons)

let pokemons = [] //global variable, available everywhere 

function getAllCards() {
	fetch(TRAINERS_URL)
		.then(response => response.json())
		// .then(console.log("here"))
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
	button.id = "add-pokemon-button"
	let trainerID = button.setAttribute('data-trainer-id', `${card.id}`) //
	button.innerHTML = "Add Pokemon"
	div.append(button) 
	
	
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
		
		releaseButton.addEventListener('click', function(e) {
			releasePokemon(card.id, pokemon.id, e)
		})
		li.appendChild(releaseButton)
		ul.appendChild(li)
	})
}

const mapIDNumberToPokemons = (id) => {
	// console.log("pokemons object:", pokemons)
	let array = pokemons.filter(pokemon => {
		// console.log("pokemon:", pokemon)
		return id === pokemon.id
	})
	// console.log('array:', array)
	//  console.log('array 0:', array[0])//returns pokemon object
	return array[0]
}

const releasePokemon = (trainerID, pokemonId, e) => {
	// console.log("release button pressed")
	//collect the id of the trainer -- data-trainer-id
	//collect id of that pokemon. == releaseButton.id
	//delete that id from the trainer -- with Delete request 
	fetch(TRAINERS_URL + '/' + trainerID + '/pokemons/' + pokemonId, {
		method: 'DELETE'
		}).then(console.log(`${pokemonId} has been removed`))
	.then( () => deletePokemonFromPage(e) )
}

const deletePokemonFromPage = (e) => {
    let el = e.target.parentElement
	el.remove()
     }
// const addPokemon = () => {
//     let randomNumber = Math.floor(Math.random() * 31) + 1
//     let pokemonIds
// 	console.log(pokemons.filter(pokemon => {

// 	})
//  }

// addPokemon()
listen for add 
fetch from pokemons, get the trainer id. 
fetch from trainer. show if they have less than 6, if so, create a random 
fethc (post, for new pokemon )
