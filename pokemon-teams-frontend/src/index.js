const BASE_URL = "http://localhost:3005"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


//user loads a page -- they see all trainers with their pokemon 
//user hits "Add pokemon" button, if they have space on their team, they get a new P 
//user hits "release pokemon" button on a specific Pok team
// that P is released from the team 


let getAllCards = () => {
	// console.log('got here 1')
	fetch(TRAINERS_URL)
		.then(response => response.json())
		.then(json => listAllCards(json))
		// .then(json => listAllCards(json))
}

window.addEventListener('DOMContentLoaded', getAllCards)


const listAllCards = (cards) => {
	console.log(cards)
	// debugger
	cards.forEach(card => createPokeTrainerCard(card))

}
const createPokeTrainerCard = (card) => {

	let div = document.createElement('div')
	div.className = 'card'
	div.setAttribute('data-id', `${data.id}` )

	let p = document.createElement('p')
	p.innerHMTML = `${data.attributes.name}`

	let button = document.createElement('button')
	button.setAttribute('data-trainer-id', `${data.id}`)
	button.innerHMTML = 'Add Pokemon'

	let ul = document.createElement('ul')

	let li = document.createElement('li')
	console.log('got here')

	ul.appendChild(li)
	div.append(p, button, ul)
	main = document.getElementsByTagName('main')
	main.appendChild(div)
}





//ul has li -- maybe another method? 
//