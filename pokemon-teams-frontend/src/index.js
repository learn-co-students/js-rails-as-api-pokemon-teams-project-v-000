const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


function getTrainers() {
	// body...
	return fetch('TRAINERS_URL')
	.then(res => res.json())
	.then(data => {
		allTheTrainers = data
		showCroppedImages(allTheTrainers)
	})
}