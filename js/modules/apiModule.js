import { randomNumber } from "./random.js";

export const getAllPosts = async () => {
  let response = await fetch(
    "https://devtoposts-default-rtdb.firebaseio.com/posts/.json"
  );
  let allPostsData = await response.json();

  return allPostsData;
};

export const postStorage = async (postObject) => {
  let response = await fetch(
    "https://devtoposts-default-rtdb.firebaseio.com/posts/.json",
    {
      method: "POST",
      body: JSON.stringify(postObject),
    }
  );
  let data = await response.json();
  return data;
};

export const postDetail = async (postId) => {
  let response = await fetch(
    `https://devtoposts-default-rtdb.firebaseio.com/posts/${postId}.json`
  );

  let post = await response.json();
  return post;
};

export const fetchAuthors = async () => {
  let random = randomNumber(50);

  let response = await fetch("js/csv/authors.csv");
  let data = await response.text();
  let rows = data.split("\n");
  let cols = rows[random].split(",");
  return cols;
};

export const fetchComments = async (totalComments) => {
  let comments = [];

  let response = await fetch("js/csv/comments.csv");
  let data = await response.text();

  let parsedData = Papa.parse(data, {
    header: false,
    skipEmptyLines: true,
  });

  let rows = parsedData.data;

  let selectedIndices = new Set();

  while (
    selectedIndices.size < totalComments &&
    selectedIndices.size < rows.length
  ) {
    let randomIndex = randomNumber(rows.length);
    if (!selectedIndices.has(randomIndex)) {
      selectedIndices.add(randomIndex);
      comments.push(rows[randomIndex]);
    }
  }

  return comments;
};
