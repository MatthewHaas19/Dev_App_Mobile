

export function getAllPostsFromDb () {
  const url = "https://dev-mobile-ig.herokuapp.com/posts/"

  return fetch(url,{
    method: 'GET'
  })
  .then((response) => response.json())
  .catch((error) => console.log(error))
}

export function getPostById (id){
  const url = "https://dev-mobile-ig.herokuapp.com/posts/"+id

  return fetch(url,{
    method: 'GET'
  })
  .then((response) => response.json())
  .catch((error) => console.log(error))
}

export function getPostByUser(id){
  const url = "https://dev-mobile-ig.herokuapp.com/posts/user/"+id
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

export function filterPostDb (filter) {
  const url = "https://dev-mobile-ig.herokuapp.com/posts/filter/filter"

  const data = JSON.stringify(filter)

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

export function votePost(vote,post) {
  const url = ""
  if(vote="+"){
      url = "https://dev-mobile-ig.herokuapp.com/posts/addVote/true"
  }
  else{
      url = "https://dev-mobile-ig.herokuapp.com/posts/addVote/false"
  }

  const data = JSON.stringify(post)

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
