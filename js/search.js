import { sortList } from './main.js';

// Search for articles with local storage values
export function searchArticles() {
  let data = JSON.parse(localStorage.getItem("articles"));

  let text = localStorage.getItem("searchText");
  let field = localStorage.getItem("searchField");
  let sort = localStorage.getItem("articleSort");
  let list = searchList(data, text, field);

  let sortedList = sortList(list, sort);
  return sortedList;
}

