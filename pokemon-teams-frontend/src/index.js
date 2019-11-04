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
    const trainerCollection = document.getElementById("trainer-collection");
    // console.log("trainers", trainers["data"])
    trainers["data"].map((trainer) => {
        
        const trainerDivCard = document.createElement('div');
        trainerDivCard.classList.add('card');
        
        const h2TrainerName = document.createElement("h2");
        h2TrainerName.textContent = trainer["attributes"].name;
        trainerDivCard.appendChild(h2TrainerName);


        trainerCollection.appendChild(trainerDivCard);
    })
}