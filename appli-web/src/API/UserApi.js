

export function getUserFromDb (name) {
  const url = "https://dev-mobile-ig.herokuapp.com/users/"+name

  return fetch(url,{
    method: 'GET'
  })
  .then((response) => response.json())
  .catch((error) => console.log(error))
}
