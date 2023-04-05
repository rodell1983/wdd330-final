
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
    .then((response) => response.json())
    .then((data) => {
      article = JSON.stringify(data);
    })
    .catch((error) => notifyUser(error));

  return article;
}

//Start Program

getArticles();
