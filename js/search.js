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

// Validate if all words in text
export function containsAllWords(words, text) {
  for (var i = 0; i != words.length; i++) {
    var word = words[i];
    if (!text.toLowerCase().includes(word.toLowerCase())) {
      return false;
    }
  }
  return true;
}
