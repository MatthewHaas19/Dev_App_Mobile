


export function getAllReportFromPost (idPost) {
  const url = "https://dev-mobile-ig.herokuapp.com/reports/posts/"+idPost

  return fetch(url,{
    method: 'GET'
  })
  .then((response) => response.json())
  .catch((error) => console.log(error))
}

export function getAllReportFromUser (emailUser) {
  const url = "https://dev-mobile-ig.herokuapp.com/reports/users/"+emailUser

  return fetch(url,{
    method: 'GET'
  })
  .then((response) => response.json())
  .catch((error) => console.log(error))
}
