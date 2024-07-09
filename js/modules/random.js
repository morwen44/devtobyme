export const generateRandomDate = () => {
  let currentDate = new Date();
  let year = Math.floor(Math.random() * (2024 - 2017 + 1)) + 2017;
  let currentYear = currentDate.getFullYear();

  let month = Math.floor(Math.random() * 12);
  let daysInMonth = new Date(year, month + 1, 0).getDate();
  let day = Math.floor(Math.random() * daysInMonth) + 1;

  let randomDate = new Date(year, month, day);

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let formattedYear =
    year === currentYear ? "" : "'" + year.toString().slice(-2);
  let formattedDate = `${months[randomDate.getMonth()]} ${randomDate
    .getDate()
    .toString()
    .padStart(2, "0")} ${formattedYear}`;

  return formattedDate;
};

export const generateRandomTime = () => {
  let hours = Math.floor(Math.random() * 24);
  let minutes = Math.floor(Math.random() * 60);
  let seconds = Math.floor(Math.random() * 60);

  let randomTime = new Date();
  randomTime.setHours(hours, minutes, seconds);

  let formattedTime = randomTime.toTimeString().split(" ")[0];

  return formattedTime;
};

export const getTimeAgo = (postDate, postTime) => {
  let currentDate = new Date();
  let postDateTime = new Date(`${postDate}T${postTime}`);

  let timeDifference = currentDate.getTime() - postDateTime.getTime();
  let secondsDifference = Math.floor(timeDifference / 1000);

  if (secondsDifference < 60) {
    return `${secondsDifference} second${
      secondsDifference !== 1 ? "s" : ""
    } ago`;
  } else if (secondsDifference < 3600) {
    let minutes = Math.floor(secondsDifference / 60);
    return `(${minutes} minute${minutes !== 1 ? "s" : ""} ago)`;
  } else if (secondsDifference < 86400) {
    let hours = Math.floor(secondsDifference / 3600);
    return `(${hours} hour${hours !== 1 ? "s" : ""} ago)`;
  } else {
    let days = Math.floor(secondsDifference / 86400);
    if (days <= 90) {
      return `(${days} day${days !== 1 ? "s" : ""} ago)`;
    } else {
      return "";
    }
  }
};

export const getFormattedDate = (postData) => {
  const parsedDate = new Date(Date.parse(postData.postDate));
  const formattedDate = `${parsedDate.getFullYear()}-${(
    parsedDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${parsedDate.getDate().toString().padStart(2, "0")}`;

  return formattedDate;
};

export const randomNumber = (max) => {
  return Math.floor(Math.random() * max);
};

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};


