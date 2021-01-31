const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const MAIN = document.querySelector('main')

document.addEventListener("DOMContentLoaded", function() {
 
  loadAllTrainers();
    
  });

 function loadAllTrainers() {
   fetch(TRAINERS_URL)
   .then(res => res.json())
   .then(results => {
      results.data.forEach(displayTrainers)
   });
 }

 function displayTrainers(value) {
    // console.log(value.attributes.name)
    let div = document.createElement('div');
    let p = document.createElement('p');
    let ul = document.createElement('ul');
    let button = document.createElement('button')

    MAIN.appendChild(div);
    div.appendChild(button)
    div.appendChild(p);
    div.appendChild(ul);
    div.classList.add("card");
    p.innerText = value.attributes.name;
    button.innerText = "Add Pokemon"

    value.attributes.pokemons.forEach(element => displayPokemons(element, ul));
 }


 function displayPokemons(element, ul) {
    let li = document.createElement('li');
    let button = document.createElement('button');
    let species = element.species;
    let nickname = element.nickname;
    button.classList.add("release");
    li.innerText = species.concat(" ( ", nickname, " )");
    ul.appendChild(li);
    li.appendChild(button)
    button.innerText = "Release"
  }


 

 
