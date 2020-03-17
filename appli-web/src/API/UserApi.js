

export function getUserFromDb (name) {
  const url = "https://dev-mobile-ig.herokuapp.com/users/"+name

  return fetch(url,{
    method: 'GET'
  })
  .then((response) => response.json())
  .catch((error) => console.log(error))
}


export function setUserDb (user) {
  const url = "https://dev-mobile-ig.herokuapp.com/users/"

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
