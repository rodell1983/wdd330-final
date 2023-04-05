import * as ui from "./ui.js";
import { likedArticles } from "./main.js";
import * as api from "./api.js";

// Load likes from local storage and build cards
async function loadLikes() {
  //Exit if no articles
  if (likedArticles.length <= 0) {
    return;
  } else {
    let list = [];
    for (var i = 0; i != likedArticles.length; i++) {
      let article = "";
      if (likedArticles[i].includes("id")) {
        article = likedArticles[i].split("id")[1];

        article = await api.getArticle(article);

        try {
          list.push(JSON.parse(article));
        } catch {}
      }
    }

    ui.buildCards(list);
  }
}

// Load liked articles
loadLikes();
