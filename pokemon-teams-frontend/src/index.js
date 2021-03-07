const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//When a user loads the page, they should see all trainers, with their current team of Pokemon.

document.addEventListener("DOMContentLoaded", (event) => {
  loadScriptFile("ajax.js")
  loadScriptFile("trainer.js")
  loadScriptFile("pokemon.js")
})

function loadScriptFile(filename) {
  console.log(`Loading Script: ${filename}`)
  var script = document.createElement('script');
  script.src = "./src/" + filename;
  document.body.appendChild(script)
}