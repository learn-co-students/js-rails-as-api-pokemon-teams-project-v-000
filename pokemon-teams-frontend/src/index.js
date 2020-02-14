const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {
    fetch(TRAINERS_URL)
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          trainerContainer = document.querySelector('main')
          for (const element of json) {
            let trainerDiv = document.createElement('div');
            trainerDiv.classList.add('card');
            trainerDiv.setAttribute('data-id', element.id);
  
            let p = document.createElement('p');
            let button = document.createElement('button');
  
            p.innerHTML = element.name;
            button.textContent = 'Add Pokemon';
            button.setAttribute('data-trainer-id', element.id);
            button.addEventListener('click', function(event) {
              let configObj = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
                },
                body: JSON.stringify({
                  'id': `${element.id}`
                })
              };
              fetch(POKEMONS_URL, configObj)
                .then(function(response) {
                  return response.json();
                })
                .then(function(json) {
                  pokemonBuilder(json, trainerDiv);
                });
            });
  
            let ul = document.createElement('ul');
            for (const pokemon of element.pokemons) {
              let li = document.createElement('li');
              li.innerHTML = pokemon.nickname + ' (' + pokemon.species + ')';
              let releaseButton = document.createElement('button');
              releaseButton.classList.add('release');
              releaseButton.textContent = "Release";
              releaseButton.setAttribute('data-pokemon-id', pokemon.id);
              releaseButton.addEventListener('click', function(event) {
                let configObj = {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                  }
                };
                fetch(POKEMONS_URL + `/${pokemon.id}`, configObj);
                releaseButton.parentNode.remove();
              });
              li.appendChild(releaseButton);
              ul.appendChild(li);
            }
  
            trainerDiv.appendChild(p);
            trainerDiv.appendChild(button);
            trainerDiv.appendChild(ul);
            trainerContainer.appendChild(trainerDiv)
          };
        });
  });
  
  function pokemonBuilder(json, trainerDiv) {
    let ul = trainerDiv.querySelector('ul')
    let li = document.createElement('li');
    li.innerHTML = json.nickname + ' (' + json.species + ')';
    let releaseButton = document.createElement('button');
    releaseButton.classList.add('release');
    releaseButton.textContent = "Release";
    releaseButton.setAttribute('data-pokemon-id', json.id);
    releaseButton.addEventListener('click', function(event) {
      let configObj = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      };
      fetch(POKEMONS_URL + `/${json.id}`, configObj);
      releaseButton.parentNode.remove();
    });
    li.appendChild(releaseButton);
    ul.appendChild(li);
    trainerDiv.appendChild(ul);
  } 