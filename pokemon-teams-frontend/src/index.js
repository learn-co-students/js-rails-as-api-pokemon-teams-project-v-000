const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const pokeBlob = poke => `<li>${poke.nickname} - ${poke.species}
    <button class="rem-poke" id=${poke.id}>Release</button>
</li>`

document.addEventListener('DOMContentLoaded', setup)

function setup(){
    const addBtn = document.querySelector('#add-pokemon')
    addBtn.addEventListener('click', getNewPokemon)
    const main = document.getElementsByTagName('main')[0]
    main.innerHTML = ""

    fetch('http://localhost:3000/trainers/3')
        .then(r => r.json())
        .then(renderPokes)
}

function renderPokes(trainerData){
    for (const poke of trainerData.pokemons) {
        addPokemon(poke)
    }
    addReleaseListeners()
}

function addPokemon(poke){
    const main = document.getElementsByTagName('main')[0]
    main.innerHTML += pokeBlob(poke)
}

function addReleaseListeners(){
    const releases = document.querySelectorAll('.rem-poke')
    for (const rel of releases){
        rel.addEventListener('click', remPoke)
    }
}

function remPoke(e){
    const pokeId = e.target.id
   fetch(`http://localhost:3000/pokemons/${pokeId}`, {
       method: "DELETE",
       headers: {
           "Content-Type": "application/json",
           "Accept": "application/json"
       }
   }).then(setup)

}

function getNewPokemon() {
    fetch('http://localhost:3000/pokemons/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ trainer_id: 2})
    })
    .then(r => r.json())
    .then(addPokemon)
}