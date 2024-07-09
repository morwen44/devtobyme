import {
  clearContainer,
  generateAuthorCard,
  generateComments,
  generatePostHTML,
  getReactions,
} from "./modules/displayModule.js";
import { postDetail } from "./modules/apiModule.js";
import { logOut, validateSession } from "./modules/validateSession.js";

let searchByTitleField = document.getElementById("searchByTitle");
let searchForm = document.getElementById("searchForm");

searchByTitleField.addEventListener("click", () => {
  searchForm.classList.remove("border-gris");
  searchForm.classList.add("border-morado", "border-2");
});

searchByTitleField.addEventListener("blur", () => {
  searchForm.classList.remove("border-morado", "border-2");
  searchForm.classList.add("border-gris");
});

let url = window.location.href;
let urlObject = new URL(url);
let urlParams = new URLSearchParams(urlObject.search);

let postId = urlParams.get("id");
let reactWrap = document.getElementById("reactWrap");
let commentForm = document.getElementById("commentForm");
let commentArea = document.getElementById("commentArea");
let submitCmtBtn = document.getElementById("submitComment");

let newComments = [];

commentForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let newCmt = commentArea.value;
  newComments.push(newCmt);
  let newComms = await generateComments("new", newComments, 2, postId)
  let newCommentsPostDetail = document.getElementById("newCommentsPostDetail");
  clearContainer(newCommentsPostDetail)
  newCommentsPostDetail.prepend(newComms)
});

const printPost = async () => {
  let postData = await postDetail(postId);
  let postWrapper = document.getElementById("postWrapper");
  let postCard = await generatePostHTML("detailPage", postData, postId);
  postWrapper.append(postCard);
  let reactions = await getReactions("liveCounter", postData, postId);
  reactWrap.append(reactions);
  await generateAuthorCard(postData);
};

window.addEventListener("DOMContentLoaded", async () => {
  await printPost();
  validateSession();

  logOut();
});
