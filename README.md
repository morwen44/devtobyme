# Dev.to Website Recreation

[View Live Project](https://devtobyme.vercel.app/)

Recreation of the main page and functionalities of the Dev.to website.

## Project Overview

This project was divided into two main phases. The first phase focused on the collaborative recreation of the visuals of the existing website Dev.to. The second phase was dedicated to independently developing the website's functionality. The project involved managing various aspects from inception to completion, ensuring adherence to timelines and quality standards. We utilized SASS, HTML, CSS, Bootstrap, JavaScript, Firebase, and Mockaroo for data simulation.

## Features

1. **Initial Screen:** 
    - Navbar with "Login" and "Create Account" buttons.
    - "Login" button directs to the login form.

2. **Login Screen:** 
    - Displays buttons and form with email and password fields.
    - Clicking "Login" simulates login and redirects to the main screen with the session started (email and password are mandatory fields).

3. **Main View (Post-login):**
    - Shows "Create Post" button, notifications, and user avatar.
    - Central column displays all posts from the database.

4. **Search Field Activation:** 
    - Filters posts in the main view based on the post title.

5. **"Relevant" Filter Activation:** 
    - Filters all posts based on their "relevant" property assigned at post creation.

6. **"Latest" Filter Activation:** 
    - Displays posts ordered from most recent to oldest.

7. **"Top" Filter Activation:** 
    - Displays top posts based on number of reactions.

8. **Aside Section:**
    - Contains three lists organized by tags.
    - Each list shows five posts containing the selected tag.
    - Both central posts and post titles in each list link to the post detail view upon clicking.

9. **Create Post:** 
    - Directs to the post creation form.
    - Form contains necessary fields to create a post.
    - Validation: All fields are mandatory.
    - Tags field creates a tag button when the spacebar is pressed, with each button including a delete option.
    - Publishing a post redirects to the main view.

## Technologies Used

- SASS
- HTML
- CSS
- Bootstrap
- JavaScript
- Firebase
- API (Mockaroo)

## Project Roles

- **Project Manager**
- **Repo Admin**
- **Bootstrap Specialist**
- **JavaScript Functionality Developer**

## Project Phases

1. **Visual Design (Collaborative):**
    - The visual design of the website was recreated collaboratively by the team.

2. **Functionality Development (Independent):**
    - Independently developed all the functionality requirements for the website.
