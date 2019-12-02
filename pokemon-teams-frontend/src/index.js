const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let trainers = document.querySelector('#trainers')

document.addEventListener("DOMContentLoaded", function() {
    
    getAllTrainers()
   
    .then(trainers => {
      trainers.forEach(trainer => {
        postTrainers(trainer)
        
      })
    })
    
  });

  function getAllTrainers() {
    return fetch('http://localhost:3000/trainers')
    .then(function(response) {
      return response.json();
    }) 
  }

  function postTrainers(trainer) {
    //variables are declared and initialized with elements and attributes
    //let element = document.createElement(tagName);
    let h2 = document.createElement('h2')
    let h4 = document.createElement('h4')
    h2.innerText = trainer.name
    h4.innerText = trainer.pokemons[0].nickname
     

    
  
    let divparentcard = document.createElement('div')
    divparentcard.setAttribute('class', 'card')
    // div card is created and all newly created elements with their
    //associated attributes are appended
    divparentcard.append(h2, h4)
    trainers.append(divparentcard)
  }
