
let search = document.getElementById("search");
let searchText = document.getElementById("articleSearch");

search.addEventListener("click", searchArticle);


getArticles();

function clearCards(){
  cards.innerHTML = ""
}

function createCard(article) {
  let cards = document.getElementById("cards");

  card = `<div class='card' ><img class='article-img' src="${article.imageUrl}" alt="Image for the article ${article.title}">`;

  card += `<h2><a href="${article.url}" target="_blank">${article.title}</a></h2>`;
  
  card += `<p>${article.summary}</p>`;
  card += `<span>Sorce: ${article.newsSite}</span></div>`;

  cards.innerHTML += card;
}
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

// Search for articles that include "text" in title
function searchArticle(){

  //Remove old search
  clearCards();
  
  text = searchText.value.toLowerCase();
  data = JSON.parse(localStorage.getItem("articles"));

  data.forEach(element => {
    if (element.title.toLowerCase().includes(text)){
      // Create HTML card
      createCard(element)
    }
    
  });
}

// Load the articles from the API
async function getArticles() {
  let size = 100;
  let start = 0;
  await fetch(
    `https://api.spaceflightnewsapi.net/v3/articles?_limit=${size}&_start=${start}`
  )
    .then((response) => response.json())
    .then((data) => {
      let stringData = JSON.stringify(data);
      localStorage.setItem("articles", stringData );
      //search.removeAttribute("disabled");
    })
    .catch((error) => notifyUser(error));
  /*let start = 0;
  localStorage.setItem("articles", "[]");
  let size = 100;
  let count = 2000;
  let storage = "[]";
  while (start <(count - start-1) ) {
    await fetch(
      `https://api.spaceflightnewsapi.net/v3/articles?_limit=${size}&_start=${start}`
    )
      .then((response) => response.json())
      .then((data) => {
        storage = localStorage.getItem("articles");
        let stringData = JSON.stringify(data);
        storage = storage.slice(0,-1);
        storage = storage + stringData.substring(1,stringData.length-1) + "]"
        localStorage.setItem("articles", storage );
        //search.removeAttribute("disabled");
      })
      .then(console.log(allArticles))
      .catch((error) => notifyUser(error));
    start += size;
    if ((count - start) < size) {
      size = count - start -1;
    }
  }*/
}
