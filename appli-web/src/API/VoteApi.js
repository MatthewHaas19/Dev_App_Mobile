export function addVote(vote) {
  const url = "https://dev-mobile-ig.herokuapp.com/votes/"

  const data = JSON.stringify(vote)

  console.log(data)

  return fetch(url,{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: data
  })
  .then((response) => response.json())
  .catch((error) => console.log(error))
}



export function getVoteByUser (name) {
  const url = "http://dev-mobile-ig.herokuapp.com/votes/user/"+name

  return fetch(url,{
    method: 'GET'
  })
  .then((response) => response.json())
  .catch((error) => console.log(error))
}


export function addVoteComment(vote) {
  const url = "https://dev-mobile-ig.herokuapp.com/votesComment/"

  const data = JSON.stringify(vote)

  console.log(data)

  return fetch(url,{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: data
  })
  .then((response) => response.json())
  .catch((error) => console.log(error))
}



export function getVoteCommentByUser (name) {
  const url = "http://dev-mobile-ig.herokuapp.com/votesComment/user/"+name

  return fetch(url,{
    method: 'GET'
  })
  .then((response) => response.json())
  .catch((error) => console.log(error))
}
