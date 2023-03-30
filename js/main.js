let search = document.getElementById("search");
let searchText = document.getElementById("articleSearch");
const searchField = document.querySelector("searchField");
const articleSort = document.getElementById("articleSort");

search.addEventListener("click", searchButtonClicked);
searchText.addEventListener("keyup", searchTextChange);
articleSort.addEventListener("change", articleSortChange);
var radios = document.forms["searchFieldForm"].elements["searchField"];
for (var i = 0, max = radios.length; i < max; i++) {
  radios[i].onclick = function () {
    //set/get field
    let sortForm = document.searchFieldForm;

    for (var i = 0; i < sortForm.length; i++) {
      if (sortForm[i].checked) {
        localStorage.setItem("searchField", sortForm[i].value);
      }
    }
  };
}
loadLocalStorage();

getArticles();

function articleSortChange(){
  localStorage.setItem("articleSort", articleSort.value.toLowerCase());
}
function searchTextChange(){
  localStorage.setItem("searchText", searchText.value.toLowerCase());
}
function loadLocalStorage() {
  //set/get search text
  if (localStorage.getItem("searchText") !== null) {
    document.getElementById("articleSearch").value =
      localStorage.getItem("searchText");
  } else {
    localStorage.setItem(
      "searchText",
      document.getElementById("articleSearch").value
    );
  }

  //set/get sort
  e = document.getElementById("articleSort");
  output = e.options[e.selectedIndex].value;
  if (localStorage.getItem("articleSort") !== null) {
    e.value = localStorage.getItem("articleSort");
  } else {
    localStorage.setItem("articleSort", output);
  }

  //set/get field
  let sortForm = document.searchFieldForm;

  if (localStorage.getItem("searchField") !== null) {
    for (var i = 0; i < sortForm.length; i++) {
      if (sortForm[i].value === localStorage.getItem("searchField")) {
        sortForm[i].checked = true;
      } else {
        sortForm[i].checked = false;
      }
    }
  } else {
    for (var i = 0; i < sortForm.length; i++) {
      if (sortForm[i].checked) {
        localStorage.setItem("searchField", sortForm[i].value);
      }
    }
  }
}
function clearCards() {
  cards.innerHTML = "";
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
function searchButtonClicked() {
  localStorage.setItem("searchText", searchText.value.toLowerCase());
  searchArticles();
}

// Search for articles with local storage values
function searchArticles() {
  let data = JSON.parse(localStorage.getItem("articles"));

  let list = [];
  let text = localStorage.getItem("searchText");
  let field = localStorage.getItem("searchField");

  data.forEach((element) => {
    switch (field) {
      case "title":
        if (element.title.toLowerCase().includes(text)) {
          list.push(element);
        }
        break;
      case "summary":
        if (element.summary.toLowerCase().includes(text)) {
          list.push(element);
        }
        break;
      case "source":
        if (element.newsSite.toLowerCase().includes(text)) {
          list.push(element);
        }
        break;
      default:
      // code block
    }
  });

  sortList(list);
}

function sortList(list) {
  let sortField = localStorage.getItem("articleSort");
  const sort_by = (field, reverse, primer) => {
    const key = primer
      ? function (x) {
          return primer(x[field]);
        }
      : function (x) {
          return x[field];
        };

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
      return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
    };
  };

  list = list.sort(sort_by(sortField), false, (a) => a.toUpperCase());

  buildCards(list);
}

function buildCards(list) {
  //Remove old search
  clearCards();
  list.forEach((element) => {
    createCard(element);
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
      localStorage.setItem("articles", stringData);
      //search.removeAttribute("disabled");
    })
    .catch((error) => notifyUser(error));
}
