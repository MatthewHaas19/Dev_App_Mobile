


export function getAllReportFromPost (idPost) {
  const url = "https://dev-mobile-ig.herokuapp.com/reports/"+idPost

  return fetch(url,{
    method: 'GET'
  })
  .then((response) => response.json())
  .catch((error) => console.log(error))
}
