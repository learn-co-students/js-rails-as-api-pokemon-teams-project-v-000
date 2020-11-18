const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function ready() {
fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(data => console.log(data));
}

document.addEventListener("DOMContentLoaded", ready);

