


export function getAllCommentFromPost (idPost) {
  const url = "https://dev-mobile-ig.herokuapp.com/comments/"+idPost

  return fetch(url,{
    method: 'GET'
  })
  .then((response) => response.json())
  .catch((error) => console.log(error))
}




export function setNewPostDb (post) {
  const url = "https://dev-mobile-ig.herokuapp.com/posts/"

  const data = JSON.stringify(post)

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
