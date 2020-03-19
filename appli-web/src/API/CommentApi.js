

export function getAllCommentFromPost (idPost) {
  const url = "https://dev-mobile-ig.herokuapp.com/comments/"+idPost

  return fetch(url,{
    method: 'GET'
  })
  .then((response) => response.json())
  .catch((error) => console.log(error))
}
