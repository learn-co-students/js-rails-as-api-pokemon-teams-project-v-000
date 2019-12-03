const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


window.addEventListener('DOMContentLoaded', (event) => {
    getTrainers();
});

function getTrainers() {
    return fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(json => renderCard(json))
}


function renderCard(data) {
    for (i = 0; i < data.length; i++) {
        let div = document.createElement('div');
        div.setAttribute("class", "card");
        div.setAttribute("data-id", i + 1);
        let p = document.createElement('p');
        p.innerText = data[i].name;
        div.appendChild(p);
        let main = document.getElementsByTagName('main')[0];
        main.appendChild(div);
        let btn = document.createElement('button');
        btn.setAttribute("data-trainer-id", data[i].id);
        btn.addEventListener('click', function(e){
            e.preventDefault();
            newPokemon(e);
        });
        btn.innerText = "Add Pokemon";
        div.appendChild(btn);
        let ul = document.createElement('ul')
        div.appendChild(ul)
    for (r = 0; r < data[i].pokemon.length; r++) {
            let li = document.createElement('li')
            li.innerText = data[i].pokemon[r].nickname + " (" + data[i].pokemon[r].species + ")"
            let button = document.createElement('button')
            button.setAttribute("class", "release");
            button.setAttribute("data-pokemon-id", data[i].pokemon[r].id);
            button.addEventListener('click', function(e){
                e.preventDefault();
                getPokemon(button);
            })
            button.innerText = "Release"
            ul.appendChild(li)
            li.appendChild(button)
        }
    
    };
}

function newPokemon(btn) {
    let trainerId = btn.path[0].dataset.trainerId;
    fetch(TRAINERS_URL + '/' + trainerId)
    .then(response => response.json())
    .then(function(data) {
        if (data.pokemon.length < 6) {
            createPokemon(data);
        } else {
            alert('Unable to add new Pokemon.  Team full.')
        }
    })  
}

function createPokemon(data) {
    let trainer = data.id;
    let id = "'"+ trainer +"'"
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({"trainer_id" : trainer}),
    }
    fetch(POKEMONS_URL, options)
    .then(response => response.json())
    .then(info => addPokemon(info)) 
}

function addPokemon(info) {
    let id = "'" + `${info.trainer_id}` + "'"
    let query = "div[data-id=" + `${id}` + "] ul"
    let ul = document.querySelectorAll(query)[0];
    let li = document.createElement('li');
    li.innerText = info.nickname + " (" + info.species + ")";
        let button = document.createElement('button');
        button.setAttribute("class", "release");
        button.setAttribute("data-pokemon-id", info.id);
        button.addEventListener('click', function(e){
            e.preventDefault();
            getPokemon(button);
        })
        button.innerText = "Release";
        ul.appendChild(li);
        li.appendChild(button);
}

function getPokemon(button) {
    let id = button.getAttribute("data-pokemon-id")
    fetch(POKEMONS_URL + '/'+ id)
    .then(response => response.json())
    .then(json => releasePokemon(json))
}

function releasePokemon(info) {
    options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(info),
    }
    fetch(POKEMONS_URL + '/'+ info.id, options)
    .then(response => response.json())
    .then(info => removeFromList(info))
}

function removeFromList(info) {
    let id = "'" + `${info.trainer_id}` + "'"
    let query = "div[data-id=" + `${id}` + "] ul"
    let ul = document.querySelectorAll(query)[0];
    let r = "button[data-pokemon-id=" + "'" + info.id + "'" + "]"
    let button = document.querySelectorAll(r)[0];
    let li = button.parentElement;
    ul.removeChild(li);
}