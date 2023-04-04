//Variables
let likedArticles = [];
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

  // set advanced search bar
  if (localStorage.getItem("advancedSearch") !== null) {
    advancedSearch.checked = parseBool(localStorage.getItem("advancedSearch"));
    toggleAS();
  }

  // load liked articles
  if (localStorage.getItem("liked") !== null) {
    likedArticles = localStorage.getItem("liked").split(",");
  }
}

async function loadLiked() {
  for (var i = 0; i != likedArticles.length; i++) {
    var id = likedArticles[i].split('id')[1];
    let article = await getArticle(id);
    createCard(JSON.parse(article));
    document.getElementById(id).checked = true;
  }
}

function clearCards() {
  let cards = document.getElementsByClassName("card");
  let savedCards = [];
  for (var i = 0; i != cards.length; i++) {
    let save = false;
    let card = cards[i];
    for (var j = 0; j != likedArticles.length; j++) {

      let id = `#${likedArticles[j]}`;
      if (card.querySelector(id) !== null) {
        save = true;
        break;
      }
    }
    if (!save) {
      savedCards.push(card);
    }
  }
  cards.innerHTML = "";
  for (var i = 0; i != savedCards.length; i++) {
    cards.innerHTML = savedCards[i].innerHTML;
  }
}
function heartClick(id) {
  let el = document.getElementById(id);
  if (el.checked) {
    likedArticles.push(`id${id}`);
    localStorage.setItem("liked", likedArticles);
  } else {
    //remove id
    likedArticles = likedArticles.filter((item) => item != `id${id}`);
    localStorage.setItem("liked", likedArticles);
  }
}
function createHeart(id) {
  let checked = false;
  for(i =0; i != likedArticles.length; i++){
    let id = likedArticles[i].split('id')[1];
    if (likedArticles[i] === id){
        checked = true;
        break;
    }
  }

  let heart = `<input type="checkbox" class="likebtn" id="${id}" onclick="heartClick(${id})"`;
  if (checked){
    heart += " checked/>";
  }else{
    heart += "/>";
  }

  heart += `<label for="${id}">
      <svg class="heart-svg" viewBox="467 392 58 57">
        <g id="Group" fill="none" fill-rule="evenodd" transform="translate(467 392)">
          <path id="heart" d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" fill="#AAB8C2"/>
          <circle id="main-circ" fill="#E2264D" opacity="0" cx="29.5" cy="29.5" r="1.5"/>

          <g id="grp7" opacity="0" transform="translate(7 6)">
            <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2"/>
            <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2"/>
          </g>

          <g id="grp6" opacity="0" transform="translate(0 28)">
            <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2"/>
            <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2"/>
          </g>

          <g id="grp3" opacity="0" transform="translate(52 28)">
            <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2"/>
            <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2"/>
          </g>

          <g id="grp2" opacity="0" transform="translate(44 6)">
            <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2"/>
            <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2"/>
          </g>

          <g id="grp5" opacity="0" transform="translate(14 50)">
            <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2"/>
            <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2"/>
          </g>

          <g id="grp4" opacity="0" transform="translate(35 50)">
            <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2"/>
            <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2"/>
          </g>

          <g id="grp1" opacity="0" transform="translate(24)">
            <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2"/>
            <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2"/>
          </g>
        </g>
      </svg>
    </label>`;

    return heart;
}
function createCard(article) {
  const formatedDate = getFormatedDate(article.publishedAt);
  let heart = createHeart(article.id);

  let cards = document.getElementById("cards");

  card = `<div class='card'><a href="${article.url}" target="_blank"><img class='article-img' src="${article.imageUrl}" onerror="this.src='./images/noimg.jpg'" alt="Image for the article ${article.title}"></a>`;

  card += `<h2><a href="${article.url}" target="_blank">${article.title}</a></h2>`;

  card += `<p>${article.summary}</p>`;
  card += `<span>Sorce: ${article.newsSite}</span><span>Published Date: ${formatedDate}</span><div class="close">${heart}</div></div>`;

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
// Load the articles by id from the API
async function getArticle(id) {
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
loadLocalStorage();
loadLiked();
