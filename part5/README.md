# FullStack-Part5
This is for the submission of exercises 5.1-5.31 of the FullStack Open's course. See Full Stack open part 5 [here](https://fullstackopen.com/en/part5)

## Objective
- Ex 5.4
  - ex 5.1-5.4 are exercises to implement login functionality in a frontend for the blogs list app, whose backend was created in [part 4](../part4/README.md)
- Ex 5.11
  - ex 5.5-5.11 are exercises to enhance the blog list frontend from ex 5.4 with improved UI behavior, state organization, blog detail toggling, like updates, data‑consistency fixes, sorting, and deletion controls.

## My Apps

### Apps 5.1
#### Ex 5.1
- Implemented login functionality to the frontend. The token returned with a successful login is saved to the application's state user. If a user is not logged in, only the login form is visible. If the user is logged-in, the name of the user and a list of blogs is shown.

#### Ex 5.2
- Made the login 'permanent' by using the local storage. Also, implemented a way to log out ensuring that the browser does not remember the details of the user after logging out.

#### Ex 5.3
- Expanded the application to allow a logged-in user to add new blogs

#### Ex 5.4
- Implemented notifications that inform the user about successful and unsuccessful operations at the top of the page.

#### Ex 5.5 + Ex 5.6
- Made the blog‑creation form visible only when appropriate (hidden by default, shown when “create new blog” is clicked, and hidden again after creating or canceling).
- Moved all form state into the blog-creation form component, similar to what is seen in the [course material](https://fullstackopen.com/en/part5/props_children_and_component_refs#state-of-the-forms).
  - Note: already proactively extracted the blog‑creation form into its own component in ex 5.3.

#### Ex 5.7
- Added a toggle button to each blog to show/hide its full details; details expand when clicked and collapse when clicked again. 