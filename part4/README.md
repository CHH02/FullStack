# FullStack-Part3
This is for the submission of exercises 4.1-4.23 of the FullStack Open's course. See Full Stack open part 4 [here](https://fullstackopen.com/en/part4)

## Objective
- Ex 4.2
  - ex 4.1-4.2 are exercises to start a backend api server to save blogs to a MongoDB Atlas database and practice project structure best practacies.

## My Apps

### Apps 4.1-4.2
#### Ex 4.1
- Created a npm project for a backend api server that saves blogs to a MongoDB Atlas database.

- Here are some screenshots from Postman to verify that the api endpoints and MongoDB Atlas database are working:
<br>![PNG of CHH02's Ex 4.1 using Postman to test POST api requests](./public/Ex4-1_Screenshot-1.png)
<br>
<br>![PNG of CHH02's Ex 4.1 using Postman to test GET api requests](./public/Ex4-1_Screenshot-2.png)
<br>

#### Ex 4.2
- Refactored the application into separate modules as shown in [this](https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing#project-structure) part of the course material. For example:

```
├── controllers
│   └── notes.js
├── dist
│   └── ...
├── models
│   └── note.js
├── utils
│   ├── config.js
│   ├── logger.js
│   └── middleware.js  
├── app.js
├── index.js
├── package-lock.json
├── package.json
```