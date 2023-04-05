import * as main from "./main.js";

export function createHeart(id) {
  let checked = false;
  for (var i = 0; i != main.likedArticles.length; i++) {
    let id = main.likedArticles[i].split("id")[1];
    if (main.likedArticles[i] === id) {
      checked = true;
      break;
    }
  }

  let heart = `<input type="checkbox" class="likebtn" id="id${id}"`;
  if (checked) {
    heart += " checked/>";
  } else {
    heart += " />";
  }

  heart += `<label aria-label="id${id}" for="id${id}">
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
export function createCard(article) {
  const formatedDate = main.getFormatedDate(article.publishedAt);
  let heart = createHeart(article.id);

  let cards = document.getElementById("cards");

  let card = `<div class='card'><a href="${article.url}" target="_blank"><img class='article-img' src="${article.imageUrl}" onerror="this.src='./images/noimg.jpg'" alt="Image for the article ${article.title}"></a>`;

  card += `<h2><a href="${article.url}" target="_blank">${article.title}</a></h2>`;

  card += `<p>${article.summary}</p>`;
  card += `<span>Sorce: ${article.newsSite}</span><span>Published Date: ${formatedDate}</span><div class="close">${heart}</div></div>`;

  cards.innerHTML += card;
}

export function clearCards() {
  let cards = document.querySelector("#cards");
  cards.innerHTML = "";
}
export function buildCards(list) {
  //Remove old search
  clearCards();
  list.forEach((element) => {
    createCard(element);
  });

  //add heart events

  let hearts = document.getElementsByClassName("likebtn");
  for (var i = 0; i != hearts.length; i++) {
    let id = hearts[i].id;
    hearts[i].addEventListener(
      "click",
      function () {
        main.heartClick(id);
      },
      true
    );
  }

  //Check liked
  for (var i = 0; i != main.likedArticles.length; i++) {
    let el = document.getElementById(main.likedArticles[i]);
    if (el !== null) {
      el.checked = true;
    }
  }
}
