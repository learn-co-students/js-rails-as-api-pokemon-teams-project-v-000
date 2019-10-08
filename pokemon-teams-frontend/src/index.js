const BASE_URL = "http://localhost:3005"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


//user loads a page -- they see all trainers with their pokemon 
//user hits "Add pokemon" button, if they have space on their team, they get a new P 
//user hits "release pokemon" button on a specific Pok team
// that P is released from the team 


let getAllCards = () => {
	fetch(TRAINERS_URL)
		.then(response => response.json())
		.then(json => listAllCards(json))
}

window.addEventListener('DOMContentLoaded', getAllCards)


const listAllCards = (cards) => {
	// console.log(cards)
	cards.data.forEach(card => createPokeTrainerCard(card))
}

const createPokeTrainerCard = (card) => {
	console.log('27: ', card)
	console.log('28: ', card.relationships.pokemons[0])

	let div = document.createElement('div')
	div.setAttribute('class', 'card' )
	div.setAttribute('data-id', `${card.id}` )

	let p = document.createElement('p')
	p.innerHTML = `${card.attributes.name}`

	let button = document.createElement('button')
	button.setAttribute('data-trainer-id', `${card.id}`)
	button.innerHTML = 'Add Pokemon'
	
	let p1 = document.createElement('p')
	p1.innerHTML = 'pokemon names here'

	let ul = document.createElement('ul')
	ul.setAttribute('class', 'trainer-list')


	let li = document.createElement('li')
	// li.innerHTML = 
	
	

	// li.append(liButton)
	ul.appendChild(li)
	div.append(p, button, p1, ul)
	const main = document.querySelector('main')
	main.appendChild(div)
}
// <li>add name
// for each pokemon -- make a button, with the id
// const makePokemonButtons
// const makePokemons = (card)
// 	card.included
// 	let liButton = document.createElement('button')
// 	liButton.setAttribute('class', 'trainer' )
// 	liButton.setAttribute('data-pokemon-id', `${card.relationship.pokemons}`)



//ul has li -- maybe another method? 
//