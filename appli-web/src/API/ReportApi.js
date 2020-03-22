


export function getAllReportFromPost (idPost) {
  const url = "https://dev-mobile-ig.herokuapp.com/reports/posts/"+idPost

  return fetch(url,{
    method: 'GET'
  })
  .then((response) => response.json())
  .catch((error) => console.log(error))
}

export function getAllReportFromComment (idComment) {
  const url = "https://dev-mobile-ig.herokuapp.com/comReports/"+idComment

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

export function setNewReport (report) {
  const url = "https://dev-mobile-ig.herokuapp.com/reports/"

  const data = JSON.stringify(report)

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
