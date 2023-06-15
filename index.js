// Fire base setup

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://champions-ae5d6-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const dataBase = getDatabase(app);

const commentsInDB = ref(dataBase, "commentsObjects");

///////////////////////////////////////////////////////////////////////////

// Variables declaraion

let input = document.getElementById("input");
let btn = document.getElementById("btn");
let commentContainer = document.getElementById("comment-container");

/////////////////////////////////////////////////////////////////////////

btn.addEventListener("click", function () {
  let inputValue = input.value;
  push(commentsInDB, inputValue);

  /////////////////////////////////////////////////////////////

  //   clearContainer();
  //   render();

  input.value = "";
});

///////////////////////////////////////////////

onValue(commentsInDB, function (snapshot) {
  if (snapshot.exists()) {
    let arr = Object.entries(snapshot.val());

    clearContainer();

    for (let i = 0; i < arr.length; i++) {
      let currentComment = arr[i];
      let currentCommentID = currentComment[0];
      let currentCommentValue = currentComment[1];
      console.log(currentCommentValue);
      render(currentComment);
    }
  } else {
    commentContainer.innerHTML = " ";
  }
});

/////////////////////////////////////////////////////////

function clearContainer() {
  commentContainer.innerHTML = "";
}

/////////////////////////////////////////////////

// render function

// function render() {
//   for (let i = 0; i < arr.length; i++) {
//     commentContainer.innerHTML += `<p class = 'comment'>${arr[i]}</p>`;
//   }
// }

function render(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let createEle = document.createElement(`p`);
  createEle.textContent = itemValue;
  commentContainer.append(createEle);

  createEle.addEventListener("dblclick", function () {
    let exactLocation = ref(dataBase, `commentsObjects/${itemID}`);
    remove(exactLocation);
  });
}
