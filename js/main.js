import {
  displayAllPosts,
  clearContainer,
  generateTagLists,
} from "./modules/displayModule.js";
import { getAllPosts } from "./modules/apiModule.js";
import { logOut, validateSession } from "./modules/validateSession.js";

window.addEventListener("DOMContentLoaded", async () => {
  await getPosts();
  sortPostsByDateTimeAscending();
});

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

let allPosts = [];

let allTags = [];
let uniqueTags = [];

const getPosts = async () => {
  let postsData = await getAllPosts();
  allPosts = Object.keys(postsData).map((key) => {
    return {
      ...postsData[key],
      id: key,
    };
  });
  allTags = allPosts.reduce((acumm, current) => {
    return acumm.includes(current.postTags)
      ? acumm
      : [...acumm, current.postTags];
  }, []);

  uniqueTags = getUniqueTags(allTags);
  generateTagLists(allPosts, uniqueTags);
  console.log(allPosts);
  console.log(uniqueTags);
  await displayAllPosts("mainPage", allPosts);
};

const getUniqueTags = (array) => {
  let flattenedArray = array.flat();

  let uniqueTagsSet = new Set(flattenedArray);

  let uniqueTagsArray = [...uniqueTagsSet];

  return uniqueTagsArray;
};

let postList = document.getElementById("postsContainer");

searchByTitleField.addEventListener("keyup", (event) => {
  let query = event.target.value.toLowerCase();
  let result = allPosts.filter((post) =>
    `${post.postTitle}`.toLowerCase().includes(query)
  );
  clearContainer(postList);
  displayAllPosts("mainPage", result);
});

let relevantTab = document.getElementById("relevantTab");

const sortPostsByRelevance = async () => {
  allPosts.sort((a, b) => a.relevance - b.relevance);
};

relevantTab.addEventListener("click", () => {
  sortPostsByRelevance();
  relevantTab.classList.add("fw-bold");
  relevantTab.classList.remove("text-border");
  latestTab.classList.remove("fw-bold");
  latestTab.classList.add("text-border");
  topTab.classList.remove("fw-bold");
  topTab.classList.add("text-border");
  clearContainer(postList);

  displayAllPosts("mainPage", allPosts);
});

let latestTab = document.getElementById("latestTab");

const sortPostsByDateTimeAscending = () => {
  allPosts.sort((a, b) => {
    let dateA = new Date(`${a.postDate} ${a.postTime}`);
    let dateB = new Date(`${b.postDate} ${b.postTime}`);

    return dateA - dateB;
  });
};

latestTab.addEventListener("click", () => {
  sortPostsByDateTimeAscending();
  relevantTab.classList.remove("fw-bold");
  relevantTab.classList.add("text-border");
  latestTab.classList.add("fw-bold");
  latestTab.classList.remove("text-border");
  topTab.classList.remove("fw-bold");
  topTab.classList.add("text-border");
  clearContainer(postList);

  displayAllPosts("mainPage", allPosts);
});

let topTab = document.getElementById("topTab");
const sortPostsByReactions = async () => {
  allPosts.sort((a, b) => a.totalReactions - b.totalReactions);
};

topTab.addEventListener("click", () => {
  sortPostsByReactions();
  topTab.classList.add("fw-bold");
  topTab.classList.remove("text-border");
  relevantTab.classList.remove("fw-bold");
  relevantTab.classList.add("text-border");
  relevantTab.classList.remove("text-border");
  latestTab.classList.remove("fw-bold");
  clearContainer(postList);

  displayAllPosts("mainPage", allPosts);
});

validateSession();
logOut();
