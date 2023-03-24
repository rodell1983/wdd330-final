let card1 = document.getElementById("card1");
let card2 = document.getElementById("card2");
let search = document.getElementById("search");

search.addEventListener("click", searchCharacter);

let allArticles = [];

getArticles();

allArticles.forEach((element) => createCard(element));
console.log("test");



function createCard(article) {
  let cards = document.getElementById("cards");

  cards.innerHTML += `<p>${article.title}</p>`;
}
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

async function getArticles() {
  let start = 0;
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
      //.then(console.log(allArticles))
      .catch((error) => notifyUser(error));
    start += size;
    if ((count - start) < size) {
      size = count - start -1;
    }
  }
}
