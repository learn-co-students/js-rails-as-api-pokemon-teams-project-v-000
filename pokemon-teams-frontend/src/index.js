const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

/* GOALS */

// Load all trainers on index page, each having their own card
// Each trainer card has its own team of pokemon:
  // "Add Pokemon" button creates a new relationship between a pokemon and the trainer
  // "Release Pokemon" button destroys the relationship between the pokemon and trainer
  // The pokemon team cannot exceed six

/* METHODS/PLAN */

// Create templates to iterate over:
  // A template for the trainer cards
  // A subtemplate for the pokemon being added to the trainer card teams
// Create event listeners for the buttons:
  // "Add Pokemon" creates a new relationship
  // "Release Pokemon" destroys an existing relationship
// Figure out which routes I need to display (look at examples in lab)

document.addEventListener("DOMContentLoaded", function() {
  fetchData();
})