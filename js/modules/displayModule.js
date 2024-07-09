import { getTimeAgo, randomNumber, shuffleArray } from "./random.js";

export const displayAllPosts = async (page, allPosts) => {
  let postList = document.getElementById("postsContainer");

  allPosts.forEach(async (post) => {
    let postCard = await generatePostHTML(page, post, post.id);
    postList.prepend(postCard);
  });
};

export const getReactions = async (page, postObject, postId) => {
  let reactions = await postObject.reactions;

  const reactionOrder = [
    "reaction-butt-like",
    "reaction-butt-unicorn",
    "reaction-butt-exploding_head",
    "reaction-butt-raised_hands",
    "reaction-butt-fire",
  ];

  let emojiMap = {
    "reaction-butt-like": "💖",
    "reaction-butt-unicorn": "🦄",
    "reaction-butt-exploding_head": "🤯",
    "reaction-butt-raised_hands": "🙌",
    "reaction-butt-fire": "🔥",
  };
  let reactionsContainer = document.createElement("a");
  reactionsContainer.className =
    "btn btn-ghost fs-reactions d-flex gap-1 w-50 align-items-center";

  let emojiStack = document.createElement("span");
  emojiStack.className = "emoji-stack d-flex align-items-center";

  let totalCounter = 0;
  const totalCounterDisplay = document.createElement("div");
  totalCounterDisplay.className = "total-counter";
  totalCounterDisplay.textContent = `${totalCounter} reactions`;

  reactionOrder.forEach(async (key) => {
    if (reactions[key]) {
      let emoji = emojiMap[key];
      let contador = await reactions[key];

      totalCounter += contador;
      totalCounterDisplay.textContent = `${totalCounter} reactions`;
      let contadorDisplay = document.createElement("span");
      contadorDisplay.textContent = ` ${contador}`;
      let reactionBtn = document.createElement("span");
      let emojiContainer = document.createElement("span");

      emojiContainer.textContent = emoji;

      switch (page) {
        case "mainPage":
          reactionBtn.className = "emoji";
          contadorDisplay.className = "d-none";
          reactionsContainer.href = `postdetail.html?id=${postId}`;
          break;
        case "detailPage":
        case "preview":
          reactionsContainer.classList.remove("btn");
          reactionBtn.className = "btn btn-nobg";
          totalCounterDisplay.className = "d-none";
          break;
        case "liveCounter":
          reactionBtn.className = "btn btn-ghost-pill";
          reactionsContainer.classList.remove("btn");
          reactionsContainer.classList.add("p-3");
          totalCounterDisplay.className = "d-none";
          break;
        default:
          console.error("Invalid page type");
          return;
      }

      let isIncrement = true;

      reactionBtn.addEventListener("click", () => {
        if (isIncrement) {
          contador++;
          totalCounter++;
        } else {
          contador--;
          totalCounter--;
        }
        contadorDisplay.textContent = ` ${contador}`;
        totalCounterDisplay.textContent = `${totalCounter} reactions`;
        isIncrement = !isIncrement;
        postObject.totalReactions = totalCounter;
      });
      postObject.totalReactions = totalCounter;
      reactionBtn.append(emojiContainer);
      reactionBtn.append(contadorDisplay);
      emojiStack.append(reactionBtn);
      reactionsContainer.append(emojiStack);
      reactionsContainer.append(totalCounterDisplay);
    }
  });

  return reactionsContainer;
};

export const generatePostHTML = async (page, postObject, postId) => {
  let title = postObject.postTitle;

  let content = postObject.postContent;

  let img = postObject.imageUrl;

  let formattedDate = postObject.formattedDate;
  let postDate = postObject.postDate;
  let postTime = postObject.postTime;

  let reactions = await getReactions(page, postObject, postId);

  let card = document.createElement("div");
  card.className = "card h-100 rounded overflow-hidden border-light-subtle";

  let cardImg = document.createElement("img");
  cardImg.className = "card-img maxh-40 w-100";
  cardImg.src = img;

  let cardBody = document.createElement("div");
  cardBody.className = "cardcontent p-3 border-light-subtle";

  let authorDiv = document.createElement("div");
  authorDiv.className = "gap-2 d-flex";

  let authorImg = document.createElement("img");
  authorImg.className = "mt-2 border rounded-circle";
  authorImg.width = "32";
  authorImg.height = "32";
  authorImg.src = postObject.authorImg;

  let authorDate = document.createElement("div");
  authorDate.className = "d-flex flex-column justify-content-center";

  let authorName = document.createElement("a");
  authorName.className = "btn btn-ghost text-dark text-start p-1 fs-m";
  authorName.textContent = postObject.authorName;

  let dates = document.createElement("p");
  dates.className = "fw-light fs-sm ms-1 text-light-emphasis link-dark fecha";

  let timeAgo = getTimeAgo(formattedDate, postTime);

  let commentsCounter = document.createElement("a");
  commentsCounter.className =
    "btn btn-ghost fs-reactions d-flex align-items-center";
  commentsCounter.textContent = `${postObject.totalComments} comments`;
  commentsCounter.href = `postdetail.html?id=${postId}#commentSection`;

  let commentIcon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  commentIcon.setAttribute("width", "24");
  commentIcon.setAttribute("height", "24");
  commentIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  commentIcon.setAttribute("class", "crayons-icon");

  // Create a path element within the SVG
  let pathElementComment = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pathElementComment.setAttribute(
    "d",
    "M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"
  );

  commentIcon.append(pathElementComment);
  commentsCounter.prepend(commentIcon);

  let reactionsContainer = document.createElement("div");
  reactionsContainer.className = "mb-3 d-flex  text-nowrap";
  reactionsContainer.append(reactions);
  reactionsContainer.append(commentsCounter);

  let abstract = document.createElement("div");
  abstract.className = "ms-5 d-flex flex-column";

  let cardTitle = document.createElement("h3");
  let titles = document.createElement("a");
  titles.className = "text-decoration-none text-dark fw-bold link-title";
  titles.textContent = title;

  let tagsList = await createLinks(page, postObject.postTags);

  let cardContent = document.createElement("p");
  cardContent.className = "ms-5 mt-4";
  cardContent.textContent = content;

  let minRead = document.createElement("div");
  minRead.className = "ms-auto d-flex align-items-center";

  let minReadText = document.createElement("p");
  minReadText.className = "fw-light fs-sm text-light-emphasis mb-0";
  minReadText.textContent = `${postObject.relevance} min read`;

  let minReadSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  minReadSvg.setAttribute("class", "btn btn-ghost-morado p-2 ms-1");
  minReadSvg.setAttribute("viewBox", "0 0");
  minReadSvg.setAttribute("width", "40");
  minReadSvg.setAttribute("height", "40");
  minReadSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

  let pathElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
  );
  pathElement.setAttribute(
    "d",
    "M6.75 4.5h10.5a.75.75 0 01.75.75v14.357a.375.375 0 01-.575.318L12 16.523l-5.426 3.401A.375.375 0 016 19.607V5.25a.75.75 0 01.75-.75zM16.5 6h-9v11.574l4.5-2.82 4.5 2.82V6z"
  );

  let comments = await generateComments(
    page,
    postObject.comments,
    postObject.totalComments,
    postId
  );

  minRead.append(minReadText);
  minRead.append(minReadSvg);
  minReadSvg.append(pathElement);
  reactionsContainer.append(minRead);
  authorDate.append(authorName);
  authorDate.append(dates);
  authorDiv.append(authorImg);
  authorDiv.append(authorDate);
  cardTitle.append(titles);
  abstract.append(cardTitle);
  abstract.append(tagsList);

  cardBody.append(authorDiv);
  cardBody.append(abstract);

  let commentsPostDetail = document.getElementById("commentsPostDetail");
  let commentsPostDetailCounter = document.getElementById(
    "commentsPostDetailCounter"
  );
  let cmtCounterR = document.getElementById("commentsCounter");
  let emojisTotalCounter = document.getElementById("emojisTotalCounter");

  switch (page) {
    case "mainPage":
      cardTitle = document.createElement("h3");
      titles.href = `postdetail.html?id=${postId}`;
      cardContent.classList.add("d-none");
      dates.textContent = `${postDate} ${timeAgo}`;
      abstract.append(reactionsContainer);
      cardBody.append(comments);
      break;
    case "detailPage":
      titles.classList.add("fs-8");
      dates.textContent = `${postDate} ${timeAgo}`;
      cardImg.className = "maxh-40 w-100";
      abstract.prepend(reactionsContainer);
      cardBody.append(cardContent);
      commentsCounter.className = "d-none";
      commentsPostDetailCounter.textContent = `(${postObject.totalComments})`;
      commentsPostDetail.append(comments);
      cmtCounterR.textContent = `${postObject.totalComments}`;
      emojisTotalCounter.textContent = postObject.totalReactions;
      break;
    case "preview":
      cardTitle = document.createElement("h1");
      titles.classList.remove("link-title");
      dates.textContent = `Posted on ${postDate}`;
      commentsCounter.className = "d-none";
      cardBody.append(cardContent);
      cardImg.className = "maxh-40 w-100";
      break;

    default:
      console.error("Invalid page type");
      return;
  }

  card.append(cardImg);
  card.append(cardBody);

  return card;
};
export const generateAuthorCard = async (postObject) => {
  let authorCardWrapper = document.getElementById("authorCard");

  let authorAvatar = document.createElement("img");
  authorAvatar.className = "mt-2 border rounded-circle";
  authorAvatar.src = postObject.authorImg;

  let nameWrapper = document.getElementById("nameWrapper");

  let authorName = document.createElement("h5");
  authorName.className = "fw-bold";
  authorName.textContent = postObject.authorName;

  authorCardWrapper.append(authorAvatar);
  nameWrapper.append(authorName);
};
export const generateComments = async (page, comments, number, postId) => {
  let commentSection = document.createElement("div");
  commentSection.className = "d-flex flex-column gap-2 ms-2 me-3 mb-3";
  commentSection.id = "commentWrapper";

  let seeAll = document.createElement("a");
  seeAll.className = "fs-m ms-5 link-border";
  seeAll.textContent = `See all ${number} comments`;
  seeAll.href = `postdetail.html?id=${postId}#commentSection`;

  comments.forEach((comment) => {
    let eachComment = document.createElement("div");
    eachComment.className = " d-flex gap-2";

    let avatarComment = document.createElement("div");
    avatarComment.className = "d-flex ms-1 mt-1";

    let avatarImg = document.createElement("img");
    avatarImg.className = "rounded-circle avatarcomment";
    avatarImg.src = comment[0];
    avatarImg.width = 24;
    avatarImg.height = 24;

    avatarComment.append(avatarImg);
    eachComment.append(avatarComment);

    let commentBox = document.createElement("div");
    commentBox.className =
      "rounded d-flex flex-column gap-1 p-3 bg-fondo w-100";

    let authorTime = document.createElement("div");
    authorTime.className = "d-flex align-items-center gap-1";

    commentBox.append(authorTime);

    let nameComment = document.createElement("a");
    nameComment.className = "text-decoration-none text-light-emphasis fs-m";
    nameComment.textContent = comment[1];

    authorTime.append(nameComment);

    let commentContent = document.createElement("div");
    commentContent.className = "fs-m";
    commentBox.append(commentContent);

    let contentText = document.createElement("p");
    contentText.textContent = comment[2];
    commentContent.append(contentText);
    eachComment.append(commentBox);
    commentSection.append(eachComment);

    if (page === "mainPage") {
      eachComment.classList.add("comment");
    }
    if (page === 'new'){
      avatarImg.src = 'https://randomuser.me/api/portraits/women/55.jpg';
      nameComment.textContent = 'Lenny Alexis';
      contentText.textContent = comment;
      commentSection.className = "d-flex flex-column gap-2 ms-2 me-3";
    }
  });

  if (page === "detailPage" || 'new') {
    seeAll.classList.add("d-none");
  }

  
  commentSection.append(seeAll);
  return commentSection;
};

let buttonClasses = [
  "btn-blue",
  "btn-indigo",
  "btn-pink",
  "btn-teal",
];


export const createLinks = async (page, tagsString) => {
  let container = document.createElement("div");
  container.className = "d-flex";
  let arrayOfWords = tagsString;
  clearContainer(container);
  
  
  arrayOfWords.forEach((word, index) => {
  
    let button = document.createElement("button");
    button.className = "d-flex gap-1 btn btn-ghost align-items-center";
    button.id = index;


    let a = document.createElement("a");
    a.className = "ps-1 fs-m link-border";
    a.href = "#";
    a.textContent = word;
    a.textContent = `# ${word}`;

    let x = document.createElement("button");
    x.className = "btn btn-ghost-morado p-1";
    x.name = "deleteTag";
    let closeIcon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    closeIcon.setAttribute("width", "24");
    closeIcon.setAttribute("height", "24");
    closeIcon.setAttribute("viewBox", "0 0 24 24");
    closeIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    closeIcon.setAttribute("class", "crayons-icon");

    let closePath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    closePath.setAttribute(
      "d",
      "M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636l4.95 4.95z"
    );

   
    closeIcon.appendChild(closePath);
    x.append(closeIcon);
    button.append(a);
    button.append(x);


    container.append(button);

    x.addEventListener("click", () => {
      arrayOfWords.splice(index, 1);

      button.remove();
      return arrayOfWords;
    });

    switch (page) {
      case "mainPage":
      case "detailPage":
      case "preview":
        x.className = "d-none";
        break;
      case "dynamic":
        button.className = "d-flex gap-1 btn align-items-center p-0";
        let randomButtonClass = buttonClasses[index % buttonClasses.length];
        button.classList.add(randomButtonClass);
        break;

      default:
        console.error("Invalid page type");
        return;
    }
  });

  return container;
};

export const generatePreview = async () => {
  previewTabButton.addEventListener("click", () => {
    if (!validateForm()) {
      alert("Please fill in all fields.");
      return;
    }
    clearContainer(postPreview);
    let postObject = collectFormData();
    let postCard = generatePostHTML("preview", postObject);
    postPreview.prepend(postCard);
  });
};

export const clearContainer = (viewContainer) => {
  while (viewContainer.firstChild) {
    viewContainer.removeChild(viewContainer.firstChild);
  }
};

export const generateTagLists = (posts, tagsArray) => {
  let tagListsContainer = document.getElementById("right-nav");
  tagListsContainer.className = "text-wrap";

  const shuffledTags = shuffleArray(tagsArray);
  const maxTags = 3;
  const limitedTags = shuffledTags.slice(0, maxTags);

  limitedTags.forEach((tag) => {
    let cardDiv = document.createElement("div");
    cardDiv.className = "card mb-3 border-light-subtle";
    let cardHeader = document.createElement("div");
    cardHeader.className =
      "card-header fw-bold fs-5 bg-transparent border-light-subtle";
    cardHeader.textContent = `# ${tag}`;

    let titlesContainer = document.createElement("ul");
    titlesContainer.className = "list-group list-group-flush";

    let filteredPosts = filterPostsByTag(posts, tag);

    displayTitles(titlesContainer, filteredPosts);


    cardDiv.append(cardHeader);
    cardDiv.append(titlesContainer);
    tagListsContainer.append(cardDiv);
  });
};

const filterPostsByTag = (allPosts, tag) => {

  return allPosts.filter(
    (post) => post.postTags && post.postTags.includes(tag)
  );
};

const displayTitles = (container, posts) => {
  let maxPosts = 5;
  let limitedPosts = posts.slice(0, maxPosts);

  limitedPosts.forEach((post) => {
    let postDiv = document.createElement("li");
    postDiv.className = "list-group-item border-light-subtle";
    let titleH = document.createElement("h6");
    let titleText = document.createElement("a");
    titleText.className = "link-dark-morado";
    titleText.textContent = post.postTitle;
    titleText.href = `postdetail.html?id=${post.id}`;
    titleH.append(titleText);

    let comments = document.createElement("div");
    comments.className = "fs-m link-medium-grey";
    comments.textContent = `${post.totalComments} comments`;

    postDiv.append(titleH);
    postDiv.append(comments);
    container.appendChild(postDiv);

    if (isNewPost(post.postDate)) {
      let newBadge = document.createElement("span");
      newBadge.className = "badge bg-warning text-warningred";
      newBadge.textContent = "New";
      postDiv.append(newBadge);
    }
  });
};

const isNewPost = (postDate) => {
  let postDateObj = new Date(postDate);
  let currentDate = new Date();
  let timeDifference = currentDate - postDateObj;
  let daysDifference = timeDifference / (1000 * 3600 * 24);
  return daysDifference <= 680;
};

