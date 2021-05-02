const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.getElementsByTagName("main")[0];
function newCard(trainer){
    const trainerName = trainer["name"];
    const trainerID = trainer["id"];
    const pokemons = trainer["pokemons"];
    function createCardDiv(){
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.trainerId = trainerID;
        main.appendChild(card);
        return card;
    }
    function addTrainerInfo(card, trainerName){
        const pTrainerName = document.createElement("p");
        pTrainerName.innerText = trainerName;
        card.appendChild(pTrainerName);
    }
    function createAddPokemonButton(card){
        const buttonAddPokemon = document.createElement("button");
        buttonAddPokemon.innerText = "Add Pokemon";
        buttonAddPokemon.classList.add("addPokemon");
        card.appendChild(buttonAddPokemon);
        buttonAddPokemon.addEventListener("click", function(){
            fetchPokemon(this.parentElement);
        });
        function fetchPokemon(thisCard){
            const trainerID = thisCard.dataset.trainerId;
            const list = thisCard.children[2];
            const formData = {
                trainer_id: trainerID
            };
            const configObj = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData)
            };
            fetch(POKEMONS_URL, configObj)
                .then(resp => resp.json())
                .then(newPokemon => {
                    if(newPokemon["error"]){
                        console.log(`Full Error: ${JSON.stringify(newPokemon)}`);
                    }else{
                      addPokemonToList(list, newPokemon);
                    }
                })
                .catch(error => console.log(error));
        }
    }
    function addPokemonListUl(card){
        const ul = document.createElement("ul");
        card.appendChild(ul);
        return ul;
    }
    function addPokemonToList(list, pokemon){
        const pokemonNickName = pokemon["nickname"], pokemonSpecies = pokemon["species"], pokemonID = pokemon["id"];
        const li = document.createElement("li");
        li.innerText = `${pokemonNickName} (${pokemonSpecies}) `;
        li.dataset.pokemonId = pokemonID;
        list.appendChild(li);
        createReleaseButton(li);
    }
    function createReleaseButton(li){
        const buttonRelease = document.createElement("button");
        buttonRelease.innerText = "Release";
        li.appendChild(buttonRelease);
        buttonRelease.addEventListener("click", function(){
            const li = this.parentElement;
            const pokemonID = li.dataset.pokemonId;
            fetch(`${POKEMONS_URL}/${pokemonID}`, { method: 'DELETE' })
                .then(resp => resp.json())
                .then(() => li.remove());
        });
    }
    function buildCard(){
        const card = createCardDiv();
        addTrainerInfo(card, trainerName);
        createAddPokemonButton(card);
        const ul = addPokemonListUl(card);
        pokemons.forEach(poke => addPokemonToList(ul, poke));
    }
    buildCard();
}

// fetch(POKEMONS_URL).then(response => response.json()).then(data => console.log(data))
fetch(TRAINERS_URL).then(response => response.json())
    .then(trainers => trainers.forEach(trainer => newCard(trainer)));

