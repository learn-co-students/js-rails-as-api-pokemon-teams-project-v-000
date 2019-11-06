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
    .then((response) => response.json())
    .then((data) => renderTrainerAndPokemon(data)) 
}

const renderTrainerAndPokemon = (trainers) => {
    // console.log(document.getElementById("trainer-collection")
    // const mainPage = document.querySelector("main");
    const trainerCollection = document.getElementsByTagName("main")[0];
    // console.log("trainers", trainers["data"])
    trainers.map((trainer) => {
        
        const trainerDivCard = document.createElement('div');
        trainerDivCard.classList.add('card');
        
        const h2TrainerName = document.createElement("h2");
        h2TrainerName.textContent = trainer.name;
        trainerDivCard.appendChild(h2TrainerName);

        const addPokemonButton = document.createElement("button");
        addPokemonButton.dataset.trainerId = trainer.id;
        addPokemonButton.textContent = "Add Pokemon";

        // addeventlistener on addpokemonbutton click function to add pokemon
        // callback function to add target
        // access event.target.dataset.trainerId
        // post request trainerId in the fetch request

        addPokemonButton.addEventListener('click', function (event) {
            console.log(event.target.dataset.trainerId, "button clicked");
            console.log(event.target);
            fetch(POKEMONS_URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'applicaiton/json'
                },
                body: JSON.stringify({
                    pokemon: {
                    species: species,
                    nickname: nickname,
                    trainerId: trainerId}
                })
            })

            // am I adding the pokemon from the backend, do i need to include a dropdown for user to select a pokemon?
        })
        trainerDivCard.appendChild(addPokemonButton);

        const pokemonUl = document.createElement("ul");
        trainer.pokemons.forEach(pokemon => {

            const pokemonNameSpecies = document.createElement("li");
            pokemonNameSpecies.textContent = `${pokemon.nickname} (${pokemon.species})`;

            const releasePokemonButton = document.createElement("button");
            releasePokemonButton.classList.add("release");
            releasePokemonButton.dataset.pokemonId = pokemon.id;
            releasePokemonButton.textContent = "Release";

            releasePokemonButton.addEventListener('click', function (event) {
                console.log(event.target.dataset.pokemonId, "button clicked");
                return fetch(`${POKEMONS_URL}/${event.target.dataset.pokemonId}`,  {
                    method: "DELETE"
                })
                .then(response => response.json());
            })

            pokemonNameSpecies.appendChild(releasePokemonButton);
            pokemonUl.appendChild(pokemonNameSpecies)
            trainerDivCard.appendChild(pokemonUl);
        });
        

        trainerCollection.appendChild(trainerDivCard);
        // mainPage.appendChild(trainerCollection);
    })
}