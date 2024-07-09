import { accumulatedTags } from "../createpost.js";
import { fetchAuthors, fetchComments, postStorage } from "./apiModule.js";
import {
  generateRandomDate,
  generateRandomTime,
  getFormattedDate,
  randomNumber,
} from "./random.js";

export const validateForm = () => {
  let formFields = document.querySelectorAll(
    "#postForm input, #postForm textarea"
  );

  let tagsPreviewChildren = tagsPreviewContainer.children;

  let hTagsPreview = tagsPreviewChildren.length > 0;

  for (let field of formFields) {
    if (field.id === "postTags") {
      continue;
    }

    if (field.value.trim() === "") {
      return false;
    }
  }
  if (!hTagsPreview) {
    return false;
  }
  return true;
};

const getButtonsIds = () => {
  let buttonIds = {
    "reaction-butt-like": "",
    "reaction-butt-unicorn": "",
    "reaction-butt-exploding_head": "",
    "reaction-butt-raised_hands": "",
    "reaction-butt-fire": "",
  };

  Object.keys(buttonIds).forEach((key) => {
    buttonIds[key] = randomNumber(10);
  });

  return buttonIds;
};

/*para crear mis 20 posts iniciales*/
export const collectFormData = async () => {
  let postData = {};
  let formFields = document.querySelectorAll(
    "#postForm textarea , #postForm input"
  );
  formFields.forEach((field) => {
    postData[field.id] = field.value.trim();
  });
  postData.postDate = generateRandomDate();
  postData.postTime = generateRandomTime();
  postData.formattedDate = getFormattedDate(postData);
  postData.reactions = getButtonsIds();
  postData.relevance = randomNumber(10);
  postData.postTags = accumulatedTags;
  postData.totalComments = randomNumber(30);
  postData.comments = await fetchComments(postData.totalComments);
  /*esto teine qaue esar en collect daqta */
  let author = await fetchAuthors();
  postData.authorImg = author[0].trim();
  postData.authorName = author[1].trim();
  return postData;
};

/* para crear un post nuevo
export const collectFormData = () => {
  let postData = {};
  let formFields = document.querySelectorAll(
    "#postForm textarea , #postForm input"
  );
  formFields.forEach((field) => {
    postData[field.id] = field.value.trim();
  });
  postData.postDate = new Date();
  postData.postTime = generateRandomTime();
  postData.formattedDate = getFormattedDate(postData);
  postData.reactions = getButtonsIds();
  console.log(postData);
  return postData;
};
*/

export const handlePublish = async () => {
  let publishButton = document.getElementById("publishBtn");
  publishButton.addEventListener("click", async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      alert("Please fill in all fields.");
      return;
    }
    let postObject = await collectFormData();
    let response = await postStorage(postObject);
    window.location.href = "index.html";
    return response;
  });
};
