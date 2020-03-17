export function getAllPostsFromDb () {
  const url = "https://dev-mobile-ig.herokuapp.com/posts/"

  return fetch(url,{
    method: 'GET'
  })
  .then((response) => response.json())
  .catch((error) => console.log(error))
}
