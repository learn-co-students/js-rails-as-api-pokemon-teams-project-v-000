const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function fetchJson(api_url, configObj={method: "GET"}){
  return fetch(api_url, configObj).then( resp => {
    if (resp.ok){
      return resp.json()
    }else{
      console.log(resp)
      throw new Error(resp)
    }
  })
}

function configOptns(method, reqBody={}){
  return{
    method: method,
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(reqBody)

  }
}