const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
document.addEventListener("DOMContentLoaded", fetchData);

function fetchData() {
    console.log("fetchData");
    fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(json => console.log(json))
        .catch(error => console.log(`My Error: ${error}`));

}