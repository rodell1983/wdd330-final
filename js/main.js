import * as ui from "./ui.js";
import { searchArticles } from "./search.js";

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
    ui.buildCards(searchArticles());
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

export function heartClick(id) {
  let el = document.getElementById(id);
  if (el.checked) {
    likedArticles.push(id);
    localStorage.setItem("liked", likedArticles);
  } else {
    //remove id
    likedArticles = likedArticles.filter((item) => item != id);
    localStorage.setItem("liked", likedArticles);
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
  ui.buildCards(searchArticles());
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

export function getFormatedDate(dateString) {
  //2023-03-28T13:55:07.000Z
  try {
    dateString = dateString.split("T")[0];
    let ymd = dateString.split("-");
    let formated = `${ymd[1]}-${ymd[2]}-${ymd[0]}`;

    return formated;
  } catch {
    return "";
  }
}

export function parseBool(str) {
  str = str.toLowerCase();
  if (str == "true") {
    return true;
  } else {
    return false;
  }
}

loadLocalStorage();
