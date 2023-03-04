# FullStack-Ex-0.4
Is for the submission of exercise 0.4 of the Full OpenStack course. Also to get the creator, CHH02, more experience with GitHub.

## Objective
To create a diagram depicting the situation where the user creates a new note on the page https://studies.cs.helsinki.fi/exampleapp/notes by writing something into the text field and clicking the submit button

## Difficulties & Learnings
- Never made a markdown (MD) file
  - So I had to search & learn how about them and how to make them
- Did not know how or where to save a markdown file
  - Through my search of MD files I found out they are saved with the .md or .markdown file extentions
  - Found that you can make your MD daigram in GitHub's README file and Issues section

## My Diagram

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
