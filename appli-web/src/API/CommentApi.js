
export function getAllCommentFromDb () {
  const url = "https://dev-mobile-ig.herokuapp.com/comments/"

  return fetch(url,{
    method: 'GET'
  })
  .then((response) => response.json())
  .catch((error) => console.log(error))
}


export function getAllCommentFromPost (idPost) {
  const url = "https://dev-mobile-ig.herokuapp.com/comments/"+idPost

  return fetch(url,{
    method: 'GET'
  })
  .then((response) => response.json())
  .catch((error) => console.log(error))
}


export function getAllCommentFromUser (emailUser) {
  const url = "https://dev-mobile-ig.herokuapp.com/comments/user/"+emailUser
  return fetch(url,{
    method: 'GET'
  })
  .then((response) => response.json())
  .catch((error) => console.log(error))
}


export function setNewCommentDb (comment) {
  const url = "https://dev-mobile-ig.herokuapp.com/comments/"

  const data = JSON.stringify(comment)

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



export function voteComment(vote,comment) {
  var url = ""
  if(vote=="+"){
      url = "https://dev-mobile-ig.herokuapp.com/comments/addVote/true"
  }
  else{
      url = "https://dev-mobile-ig.herokuapp.com/comments/addVote/false"
  }

  const data = JSON.stringify(comment)

  console.log(data)

  return fetch(url,{
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: data
  })
  .then((response) => response.json())
  .catch((error) => console.log(error))
}
