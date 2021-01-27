const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

document.addEventListener('DOMContentLoaded', ()=> {
    getTrainers()
})

const getTrainers = () => {
    fetch(TRAINERS_URL)
        .then(res => res.json())
        .then(json => {
            console.log('hello')
        })
        
}