

export function getUserFromDb (name) {
  const url = "https://polytech-beer.herokuapp.com/run/users/"+name

  return fetch(url,{
    method: 'GET'
  })
  .then((response) => response.json())
  .catch((error) => console.log(error))
}


export function modifyUserDb (user) {
  const url = "https://polytech-beer.herokuapp.com/run/users/"
  const data = JSON.stringify(user)

  console.log(data)
  return fetch(url,{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: data
  })
  .then((response) => response.text())
  .catch((error) => console.log(error))
}
