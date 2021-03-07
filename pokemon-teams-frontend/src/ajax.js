function fetchFromServer(url) {
  return fetch(BASE_URL + url).then(resp=>resp.json()).catch(error=>`Error on fetchFromServer(${url}) with msg: ${error}`)
}

function postToServer(url, content, method="POST") {
  const config = {
    method: method,
    headers: { 
    "Content-Type": "application/json", 
    "Accept": "application/json"
    },
    body: JSON.stringify(content)
  }
  return fetch(`${BASE_URL}${url}`, config).then(resp=>resp.text()).catch(error=>{console.log(`Error while sending ${config} to URL(${url}) with error: ${error}`)})
}