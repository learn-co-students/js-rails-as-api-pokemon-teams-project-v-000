//Whenever a user hits "Add Pokemon" and they have space on their team, they should get a new Pokemon.

//Whenever a user hits "Release Pokemon" on a specific Pokemon team, that specific Pokemon should be released from the team.

function createPokemonForTrainer(trainer) {
  const body = {trainer_id: trainer.id}
  return postToServer("/pokemons", body)
}

function removePokemon(pokemon) {
  return postToServer(`/pokemons/${pokemon.id}`, {pokemon: {your: "face"}}, "DELETE")
}