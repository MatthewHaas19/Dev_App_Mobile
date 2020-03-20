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
