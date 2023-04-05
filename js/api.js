// Load the articles from the API
export async function getArticles() {
  let size = 100;
  let start = 0;
  await fetch(
    `https://api.spaceflightnewsapi.net/v3/articles?_limit=${size}&_start=${start}`
  )
    .then((response) => response.json())
    .then((data) => {
      let stringData = JSON.stringify(data);
      localStorage.setItem("articles", stringData);
      //search.removeAttribute("disabled");
    })
    .catch((error) => notifyUser(error));
}
// Load the articles by id from the API
export async function getArticle(id) {
  let article = "";
  await fetch(`https://api.spaceflightnewsapi.net/v3/articles/${id}`)
    .then((response) => {
      var contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return response.json();
      }
      throw new TypeError("Sorry, There's no JSON here!");
    })
    .then((jsonifiedResponse) => {
      article = JSON.stringify(jsonifiedResponse);
    })
    .catch((error) => console.log(error));
  /*
    .then((response) => response.json())
    .then((data) => {
      article = JSON.stringify(data);
    })
    .catch((error) => notifyUser(error));
    */

  return article;
}

export function validRes(text) {
  try {
    const json = JSON.parse(text);
    return json;
  } catch (err) {
    throw new Error("Did not receive JSON, instead received: " + text);
  }
}

//Start Program

getArticles();
