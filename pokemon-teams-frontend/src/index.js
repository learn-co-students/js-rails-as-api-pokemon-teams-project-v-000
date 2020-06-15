const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const addPoke = document.querySelector("[data-trainer-id]");
//const ul = document.querySelector("[data-id]").querySelector('ul');



/* addPoke.addEventListener("click", function(event) {
    let li = document.querySelector('li');
    const ul = document.querySelector("[data-id]").querySelector('ul');
    ul.appendChild(li)
    li.innerHTML = "New Pokemon";
})
*/

fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => {
        //console.log(json[0].name);
        json.forEach(trainer => {
            const trainerHTML = `<div class='card' data-id='${trainer.id}'><p>${trainer.name}</p>
            <button data-trainer-id="${trainer.id}">Add Pokemon</button>
            <ul data-trainer-ul-id=${trainer.id}>
            </ul>
            </div>`

            const main = document.querySelector('main');
            const p = document.createElement('p');
            p.innerHTML = trainerHTML
            main.appendChild(p)

            const trainerUl = document.querySelector(`[data-trainer-ul-id='${trainer.id}']`)
            trainer.pokemons.forEach(pokemon => {
                const pokeHTML = `<li>${pokemon.name} (${pokemon.species})</li>`;
                const li = document.createElement('li');
                li.innerHTML = pokeHTML;
                trainerUl.appendChild(li)

            })
        })
    })


        /*const addPoke = document.querySelector("[data-trainer-id]");
        const ul = document.querySelector("[data-id]").querySelector('ul');

        json.forEach(trainer => {
            trainerHTML = <div class="card" data-id="1"><p>Prince</p>
            <button data-trainer-id="1">Add Pokemon</button>
            <ul>
              <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
              <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
              <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
              <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
              <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
            </ul>
          </div>
        })
    });
*/