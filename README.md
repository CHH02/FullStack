# FullStack-Part0
Is for the submission of exercise 0.4 of the Full OpenStack course. Also to get the creator, CHH02, more experience with GitHub.

## Objective
- Ex 0.4
  - To create a diagram depicting the situation where the user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes by writing something into the text field and clicking the submit button
- Ex 0.5
  - Create a diagram depicting the situation where the user goes to the single-page app version of the notes app at https://studies.cs.helsinki.fi/exampleapp/spa
- Ex 0.6
  - Create a diagram depicting the situation where the user creates a new note using the single-page version of the app

## Difficulties & Learnings
- Never made a markdown (MD) file
  - So I had to search & learn how about them and how to make them
- Did not know how or where to save a markdown file
  - Through my search of MD files I found out they are saved with the .md or .markdown file extentions
  - Found that you can make your MD daigram in GitHub's README file and Issues section

## My Diagrams

### Ex 0.4
```mermaid
sequenceDiagram
        actor u as User
        participant w as Website
        participant s as Server

        u->>w: submit new note through HTML Form
        activate w
        w->>s: POST https://studies.cs.helsinki.fi/exampleapp/new_note
        deactivate w
        activate s
        s-->>w: status code 302
        deactivate s
        activate w
        Note right of w: The server responds with a URL redirect
        w->>s: GET https://studies.cs.helsinki.fi/exampleapp/notes
        deactivate w
        activate s
        s-->>w: HTML Document (notes)
        deactivate s
        Note right of w: webpage notes is reloaded with the new note
```

### Ex 0.5
```mermaid
sequenceDiagram
        actor u as User
        participant w as Website
        participant s as Server

        u->>w: Goes to https://studies.cs.helsinki.fi/exampleapp/spa
        activate w
        w->>s: GET https://studies.cs.helsinki.fi/exampleapp/spa
        deactivate w
        activate s
        s-->>w: status code 200
        deactivate s
        activate w
        Note right of w: returns the HTML document
        w->>s: GET https://studies.cs.helsinki.fi/exampleapp/main.css
        activate s
        w->>s: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
        deactivate w
        s-->>w: status code 200
        deactivate s
        activate w
        Note right of w: returns the CSS and JS file required by the HTML document
        w->>s: GET https://studies.cs.helsinki.fi/exampleapp/data.json
        activate s
        w->>s: GET https://studies.cs.helsinki.fi/exampleapp/favicon.ico
        deactivate w
        s-->>w: status code 200
        deactivate s
        Note right of w: returns the notes that populate the webpage<br/>and the favicon image used by the webpage 
        Note right of u: The webpage is now fully rendered in the browser
```

### Ex 0.6
```mermaid
sequenceDiagram
        actor u as User
        participant w as Website
        participant s as Server

        u->>w: submit new note through HTML Form
        activate w
        w->>s: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
        deactivate w
        activate s
        s-->>w: status code 201 "created"
        deactivate s
        Note right of w: JavaScript from browser successfully POSTs new note to server 
        Note right of u: JavaScript in browser rerenders<br/>webpage w/ the new note
```
