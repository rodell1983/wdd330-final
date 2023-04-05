import * as ui from "./ui.js";

//Variables
export let likedArticles = [];
export let search = document.getElementById("search");
export let searchText = document.getElementById("articleSearch");
export const searchField = document.querySelector("searchField");
export const articleSort = document.getElementById("articleSort");
export const advancedSearch = document.getElementById("advancedSearch");

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
var e = document.getElementById("articleSort");
var output = e.options[e.selectedIndex].value;
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
  ui.buildCards(searchArticles());
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

/*
async function loadLiked() {
  for (var i = 0; i != likedArticles.length; i++) {
    var id = likedArticles[i].split('id')[1];
    let article = await getArticle(id);
    createCard(JSON.parse(article));
    document.getElementById(id).checked = true;
  }
}
*/


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




// Search json list for text based on field
export function searchList(data, text, field) {
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
export function containsAllWords(words, text) {
  for (var i = 0; i != words.length; i++) {
    var word = words[i];
    if (!text.toLowerCase().includes(word.toLowerCase())) {
      return false;
    }
  }
  return true;
}
// Sort list based on field
export function sortList(list, sortField) {
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

export function getFormatedDate(dateString) {
  //2023-03-28T13:55:07.000Z
  dateString = dateString.split("T")[0];
  let ymd = dateString.split("-");
  let formated = `${ymd[1]}-${ymd[2]}-${ymd[0]}`;

  return formated;
}

export function parseBool(str) {
  str = str.toLowerCase();
  if (str == "true") {
    return true;
  } else {
    return false;
  }
}


