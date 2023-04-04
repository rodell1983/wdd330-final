//Variables
let search = document.getElementById("search");
let searchText = document.getElementById("articleSearch");
const searchField = document.querySelector("searchField");
const articleSort = document.getElementById("articleSort");
const advancedSearch = document.getElementById("advancedSearch");

//Events
search.addEventListener("click", searchButtonClicked);
searchText.addEventListener("keyup", searchTextChange);
articleSort.addEventListener("change", articleSortChange);
advancedSearch.addEventListener("change", toggleAS);

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
    searchArticles();
  };
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

//Functions
function toggleAS() {
  localStorage.setItem("advancedSearch", advancedSearch.checked);
  if (advancedSearch.checked) {
    document.querySelector(".adv-search-bar").classList.remove("hide");
  } else {
    document.querySelector(".adv-search-bar").classList.add("hide");
  }
}
function articleSortChange() {
  localStorage.setItem("articleSort", articleSort.value.toLowerCase());
  searchArticles();
}
function searchTextChange() {
  localStorage.setItem("searchText", searchText.value.toLowerCase());
}
// Search for articles that include "text" in title
function searchButtonClicked() {
  localStorage.setItem("searchText", searchText.value.toLowerCase());
  searchArticles();
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

  if (localStorage.getItem("advancedSearch") !== null) {
    advancedSearch.checked = parseBool(localStorage.getItem("advancedSearch"));
    toggleAS();
  }
}

function clearCards() {
  cards.innerHTML = "";
}

function createCard(article) {
  const formatedDate = getFormatedDate(article.publishedAt);

  let cards = document.getElementById("cards");

  card = `<div class='card' ><a href="${article.url}" target="_blank"><img class='article-img' src="${article.imageUrl}" onerror="this.src='./images/noimg.jpg'" alt="Image for the article ${article.title}"></a>`;

  card += `<h2><a href="${article.url}" target="_blank">${article.title}</a></h2>`;

  card += `<p>${article.summary}</p>`;
  card += `<span>Sorce: ${article.newsSite}</span><span>Published Date: ${formatedDate}</span></div>`;

  cards.innerHTML += card;
}

// Search for articles with local storage values
function searchArticles() {
  let data = JSON.parse(localStorage.getItem("articles"));

  let text = localStorage.getItem("searchText");
  let field = localStorage.getItem("searchField");
  let sort = localStorage.getItem("articleSort");
  let list = searchList(data, text, field);

  let sortedList = sortList(list, sort);
  buildCards(sortedList);
}

function buildCards(list) {
  //Remove old search
  clearCards();
  list.forEach((element) => {
    createCard(element);
  });
}

// Search json list for text based on field
function searchList(data, text, field) {
  let list = [];
  let words = text.split(" ");

  data.forEach((element) => {
    switch (field) {
      case "title":
        if (containsAllWords(words, element.title)) {
          list.push(element);
        }
        break;
      case "summary":
        if (containsAllWords(words, element.summary)) {
          list.push(element);
        }
        break;
      case "source":
        if (containsAllWords(words, element.newsSite)) {
          list.push(element);
        }
        break;
      default:
    }
  });

  return list;
}
function containsAllWords(words, text) {
  for (var i = 0; i != words.length; i++) {
    var word = words[i];
    if (!text.toLowerCase().includes(word.toLowerCase())) {
      return false;
    }
  }
  return true;
}
// Sort list based on field
function sortList(list, sortField) {
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

  return list;
}

function getFormatedDate(dateString) {
  //2023-03-28T13:55:07.000Z
  dateString = dateString.split("T")[0];
  let ymd = dateString.split("-");
  let formated = `${ymd[1]}-${ymd[2]}-${ymd[0]}`;

  return formated;
}

function parseBool(str) {
  str = str.toLowerCase();
  if (str == "true") {
    return true;
  } else {
    return false;
  }
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

//Start Program
getArticles();
loadLocalStorage();
