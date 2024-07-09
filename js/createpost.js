import {
  collectFormData,
  handlePublish,
  validateForm,
} from "./modules/formModule.js";
import {
  generatePostHTML,
  clearContainer,
  createLinks,
} from "./modules/displayModule.js";

let closeButton = document.getElementById("closePost");

closeButton.addEventListener("click", () => {
  window.location.href = "index.html";
});
let postPreview = document.getElementById("postPreview");
let previewTabButton = document.getElementById("preview-tab");

previewTabButton.addEventListener("click", async () => {
  if (!validateForm()) {
    alert("Please fill in all fields.");
    return;
  }
  clearContainer(previewContainer);
  let postObject = await collectFormData();
  let postCard = await generatePostHTML("preview", postObject);
  postPreview.append(postCard);
});

let previewContainer = document.getElementById("postPreview");

window.addEventListener("DOMContentLoaded", async () => {
  handlePublish();
});

export let tagsPreviewContainer = document.getElementById(
  "tagsPreviewContainer"
);

let tagsInput = document.getElementById("postTags");
export let accumulatedTags = [];

tagsInput.addEventListener("keydown", async (event) => {
  if (event.code === "Space") {
    event.preventDefault();

    let tagsString = tagsInput.value.trim();

    if (tagsString && accumulatedTags.length < 4) {
      accumulatedTags.push(tagsString);

      clearContainer(tagsPreviewContainer);

      tagsPreviewContainer.append(await createLinks('dynamic',accumulatedTags));

      tagsInput.value = " ";

      
    } else {
      alert("Max number of tags reached");
    }
  }
});

const handleToggleElement = (triggerId, elementId) => {
  let triggerElement = document.getElementById(triggerId);
  let targetElement = document.getElementById(elementId);

  const handleClick = (event) => {
    if (event.target === triggerElement) {
      targetElement.className = "d-block";
    } else if (!targetElement.contains(event.target)) {
      targetElement.className = "d-none";
    }
  };

  triggerElement.addEventListener("click", handleClick);

  document.addEventListener("click", handleClick);
};

let toolbar = document.getElementById("toolbar");

const children = toolbar.querySelectorAll("*");

children.forEach((child) => {
  child.addEventListener("click", (event) => {
    if (event.target === triggerElement) {
      editorTips.className = "d-block";
    } else if (!targetElement.contains(event.target)) {
      editorTips.className = "d-none";
    }
  });
});

handleToggleElement("postTitle", "titleTips");

handleToggleElement("postTags", "tagsTips");

