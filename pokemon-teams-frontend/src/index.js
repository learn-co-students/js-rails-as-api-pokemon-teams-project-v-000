document.addEventListener('DOMContentLoaded', function() {
    fetchTrainers();
})

const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// fetch all trainers and append to div.card 
// then loop over each trainer's list of pokemon and display

const fetchTrainers = () => {

    fetch(TRAINERS_URL)
    .then((response) => response.text())
    .then((data) => console.log(data, "trainers found")) 
}
