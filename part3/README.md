# FullStack-Part3
This is for the submission of exercises 3.1-3.22 of the Full OpenStack course. See Full Stack open part 3 [here](https://fullstackopen.com/en/part3)

## Objective
- Ex 3.11
  - Description:
    - ex 3.1-3.6 are exercises for creating a backend api server for the phonebook application from ex 2.17 using Node js and Express.
    - ex 3.7-3.8 are exercises for understanding middleware, here we implement [Morgan](https://github.com/expressjs/morgan) as middleware for this purpose.
    - ex 3.9-3.11 are exercises that connect ex 2.17's phonebook application to this phonebook backend and to then deploy it to the internet. Here we use render to deploy our backend web service that also servers the phonebook frontend's production build statically.
  - Live View:
    - This React App can be seen [here](https://render-test-ushk.onrender.com) (https://render-test-ushk.onrender.com)

## My Apps

### Apps 3.1-3.8
#### Ex 3.1
- Implemented a Node application that returns a hardcoded list of phonebook entries at .../api/persons.

#### Ex 3.2
- Implemented a page at .../info that displays how many people are currently in the phonebook and at what time the server received this get request.

#### Ex 3.3
- Implemented the functionality for displaying the information for a single phonebook entry, e.g., .../api/person/{id_of_resource_here}.

#### Ex 3.4
- Implemented functionality for deleting a single phonebook entry from the server.
<br>![PNG of CHH02's Ex 3.4 being tested by Postman](./public/Ex3-4_Screenshot.png)

#### Ex 3.5
- Expanded the backend so new phonebook entries can be added by using HTTP POST requests to .../api/persons.
<br>![PNG of CHH02's Ex 3.5 being tested by Postman](./public/Ex3-5_Screenshot.png)

#### Ex 3.6
- Implemented error handling for creating new entries:
```JS
app.post('/api/persons', (request, response) => {
    const body = request.body
  
    // Error Handling
    if (!body.name) {   // must have a name
        return response.status(400).json({ 
            error: 'name missing' 
        })
    } else if (!body.number) {  // must have a number
        return response.status(400).json({
            error: 'number missing'
        })
    } else if (persons.some(n => n.name === body.name)) {   // must be a unique name
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: String(Math.trunc(Math.random() * 1000)),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
})
```
<br>![PNG of CHH02's Ex 3.6 being tested by Postman](./public/Ex3-6_Screenshot.png)

#### Ex 3.7
- Added the [morgan](https://github.com/expressjs/morgan) middleware to the phonebook application for logging requests made to the server on the backend.
```Bash
npm install morgan
```
```JS
const morgan = require('morgan')
...
app.use(morgan('tiny'))
```

#### Ex 3.8
- Configured morgan so that it also shows the data sent with requests, e.g., with HTTP POST requests.
<br>![PNG of CHH02's Ex 3.8 logging requests to the console](./public/Ex3-8_Screenshot.png)
<br>

```JS
// created a custon morgan token and stringify'd it to print to the console
morgan.token('body', request => JSON.stringify(request.body))
...
// modified morgan middleware paramaters to accept the custom token created above
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
```

### Apps 3.9-3.11
- Examples that modify the phonebook frontend application made in Ex 2.17 to work with the phonebook backend application made in 3.8, and then deploy this to the internet.

#### Ex 3.9
- Modify the phonebook application's frontend and backend to work with eachother.
```JS
// modify the persons.js file from Ex 2.17's frontend phonebook application
// change baseUrl to our backend phonebook application from Ex 3.8
// before: const baseUrl = 'http://localhost:3001/persons' 
// after:  const baseUrl = 'http://localhost:3001/api/persons'
import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {...}

const create = newObject => {...}

const remove = id => {...}

const update = (id, newObject) => {...}

export default { getAll, create, remove, update }
```

```JS
// install "npm install cors" on the backend application from Ex 3.8
// then modify the backend's index.js file to use this cors to address
// same origin policy conflict
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
...
app.use(cors)
```

#### Ex 3.10
- Deploy the phonebook application's backend modified in Ex 3.9 above to the internet
 - Note: I used render to do it, here is the [link](https://render-test-ushk.onrender.com)
```JS
// modify the backend's index.js file to listen to Render's port provided in the environment when deployed to the internet
// before: const PORT = 3001
// after: const PORT = process.env.PORT || 3001
const PORT = process.env.PORT || 3001
```
- The following changes were made for development purposes:
```JS
// for development purposes, modify vite.config.js to proxy to backend
// so we can remove cors and run our build locally like it is seen on render (the internet)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    }
  },
})
```
```JS
// Uninstall "npm revmove cors" on the backend application from Ex 3.9.
// Then modify the backend's index.js file to remove cors
const express = require('express')
const morgan = require('morgan')
//const cors = require('cors') -> deleted
const app = express()
...
//app.use(cors) -> deleted
```

#### Ex 3.11
- Deploy the phonebook application's frontend modified in Ex 3.9 above to the internet through the backend from Ex 3.10
 - Note: I used render to do it, here is the [link](https://render-test-ushk.onrender.com)
```JS
// modify the persons.js file from Ex 3.9's frontend phonebook application
// change baseUrl to use relative URL since here the frontend and backend have the same address 
// before:  const baseUrl = 'http://localhost:3001/api/persons'
// after: const baseUrl = '/api/persons'
import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {...}

const create = newObject => {...}

const remove = id => {...}

const update = (id, newObject) => {...}

export default { getAll, create, remove, update }
```
```JS
// modify index.js file from Ex 3.10's backend phonebook application
// to serve our frontend build in 'dist' as static files
...
app.use(express.static('dist'))
```

### Apps 3.12-3.21
#### Ex 3.12
- Create a cloud-based MongoDB database for the phonebook application with MongoDB Atlas. Create a mongo.js file in the project directory, that can be used for adding entries to the phonebook, and for listing all of the existing entries in the phonebook.

```js 
### mongo.js ###

const mongoose = require('mongoose')
...
mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// add person to phonebook database if given the data to add
if (name && number) {
    
    const person = new Person({
      name: name,
      number: number,
    })
    
    person.save().then(result => {
      console.log(`added ${person.name} number ${person.number} to phonebook`)
      mongoose.connection.close()
    }).catch(err => { ... })
}
// else if no data is given then just return all database entries so far 
else if (!name && !number) {
    Person.find({}).then(result => {
        console.log('phonebook:');
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      }).catch(err => { ... })
}
// otherwise something must have gone wrong so go ahead and close connection to DB
else {
    mongoose.connection.close()
    console.log("Incomplete set of data, give a name and a number. Terminating connection... ");
    process.exit(1)   
}
```

#### Ex 3.13
- Change the fetching of all phonebook entries so that the data is fetched from the database. Verify that the frontend works after the changes have been made. Write all Mongoose-specific code into its own module.

```JS
### index.js ###

// modify Ex 3.11's index.js file to use our database

require('dotenv').config()  // added this line to access environment variables
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person') // added this line to import our person model

const app = express()
morgan.token('body', request => JSON.stringify(request.body))

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = []  // replaced hardcoded data with empty []

app.get('/api/persons', (request, response) => {
    // modified this function to use our database's person model to fetch persons data
    Person.find({}).then((persons) => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {...})

app.get('/api/persons/:id', (request, response) => {...})

app.delete('/api/persons/:id', (request, response) => {...})
  
app.post('/api/persons', (request, response) => {...})

const PORT = process.env.PORT // removed "|| 3001" as we use an environment variable instead
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

```JS
### perons.js ###

// create a person.js file to model our data for the database

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, { family: 4 })

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)
```

- Here are some screenshots from the browser and terminal to verify that the frontend works with these changes:
<br>![PNG of CHH02's Ex 3.13 frontend functioning correctly on browser](./public/Ex3-13_Screenshot-1.png)
<br>
<br>![PNG of CHH02's Ex 3.13 logging requests to the console](./public/Ex3-13_Screenshot-2.png)

#### Ex 3.14
- Change the backend so that new numbers are saved to the database. Verify that the frontend still works after the changes. At this stage, we're ignoring whether there is already a person in the database with the same name as the person being added.

```JS
### index.js ###

// modify Ex 3.13's index.js file to use our database

... // beginning of file

app.get('/api/persons/:id', (request, response) => {
    // modified this function to use our database's person model to fetch a person from the database

    const id = request.params.id
  
    Person.findById(id)
        .then((person) => {
            response.json(person)
        })
        .catch((error) => {
            console.log('error finding person by ID:', error.message);
            response.status(404).end()
        })
})

app.delete('/api/persons/:id', (request, response) => {...})
  
app.post('/api/persons', (request, response) => {
    // modified this function to use our database's person model to save person data to database

    const body = request.body
  
    if (!body.name) {
        return response.status(400).json({ 
            error: 'name missing' 
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    } else if (persons.some(n => n.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
  
    const person = new Person({
      name: body.name,
      number: body.number
    })
    
    person.save().then((savedPerson) => {
        response.json(savedPerson)
    })
})

... // rest of file

```

- Here are some screenshots from the browser and terminal to verify that the frontend works with these changes:
<br>![First PNG of CHH02's Ex 3.14 frontend functioning correctly on browser](./public/Ex3-14_Screenshot-1.png)
<br>
<br>![Second PNG of CHH02's Ex 3.14 frontend functioning correctly on browser](./public/Ex3-14_Screenshot-2.png)
<br>
<br>![PNG of CHH02's Ex 3.14 logging requests to the console](./public/Ex3-14_Screenshot-3.png)

#### Ex 3.15
- Change the backend so that deleting phonebook entries is reflected in the database. Verify that the frontend still works after making the changes.

```JS
### index.js ###

// modify Ex 3.14's index.js file to use our database

... // beginning of file

app.delete('/api/persons/:id', (request, response) => {
    // modified this function to use our database's person model to delete a person from the database
    const id = request.params.id
    Person.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))  
})

... // rest of file

```

- Here are some screenshots from the browser and terminal to verify that the frontend works with these changes:
<br>![First PNG of CHH02's Ex 3.15 frontend functioning correctly on browser](./public/Ex3-15_Screenshot-1.png)
<br>
<br>![Second PNG of CHH02's Ex 3.15 frontend functioning correctly on browser](./public/Ex3-15_Screenshot-2.png)
<br>
<br>![PNG of CHH02's Ex 3.15 logging requests to the console](./public/Ex3-15_Screenshot-3.png)

#### Ex 3.16
- Move the error handling of the application to a new error handler middleware.

```JS
### index.js ###

// modify Ex 3.15's index.js file to use our new error handler middleware

... // beginning of file

Person.find({}).then(result => persons = result)

app.get('/api/persons', (request, response) => {...})

app.get('/info', (request, response) => {...})

// use next function to pass error to error handler middleware
app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
  
    Person.findById(id)
        .then((person) => {
            response.json(person)
        })
        .catch((error) => {
            error.status(404)
            next(error)
            console.log('error finding person by ID:', error.message);
        })
})

// use next function to pass error to error handler middleware
app.delete('/api/persons/:id', (request, response, next) => {...})
  
app.post('/api/persons', (request, response) => {...})

// here define and use unknown endpoint handler middleware
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
  
app.use(unknownEndpoint)

// here define and use error handler middleware
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
}

app.use(errorHandler)

... // rest of file

```

#### Ex 3.17
- If the user tries to create a new phonebook entry for a person whose name is already in the phonebook, the frontend will try to update the phone number of the existing entry by making an HTTP PUT request to the entry's unique URL. Modify the backend to support this request. Verify that the frontend works after making your changes.

```JS
### index.js ###

// modify Ex 3.16's index.js file to use our database

... // beginning of file

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body
  
    Person.findById(request.params.id)
      .then(person => {
        if (!person) {
          return response.status(404).end()
        }
  
        person.name = name
        person.number = number
  
        return person.save().then((updatedPerson) => {
          response.json(updatedPerson)
        })
      })
      .catch(error => next(error))
})

... // rest of file

```

- Here are some screenshots from the browser and terminal to verify that the frontend works with these changes:
<br>![First PNG of CHH02's Ex 3.17 frontend functioning correctly on browser](./public/Ex3-17_Screenshot-1.png)
<br>
<br>![Second PNG of CHH02's Ex 3.17 frontend functioning correctly on browser](./public/Ex3-17_Screenshot-2.png)
<br>
<br>![PNG of CHH02's Ex 3.17 logging requests to the console](./public/Ex3-17_Screenshot-3.png)

#### Ex 3.18
- Update the handling of the HTTP GET api/persons/:id and info routes to use the database, and verify that they work directly with the browser, Postman, or VS Code REST client.

```JS
### index.js ###

// modify Ex 3.17's index.js file to use our database

... // beginning of file

app.get('/info', (request, response) => {
    Person.find({}).then((perons) => {
        response.send(`
                <p>Phonebook has info for ${persons.length} ${(persons.length === 1) ? 'person' : 'people'}</p>
                <p>${Date(Date.now()).toString()}</p>
        `)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
  
    Person.findById(id)
        .then((person) => {
            response.json(person)
        })
        .catch((error) => {
            next(error)
            console.log('error finding person by ID:', error.message);
            response.status(404).end()
        })
})

... // rest of file

```

- Here are some screenshots from the browser and terminal to verify that the frontend works with these changes:
<br>![First PNG of CHH02's Ex 3.18 frontend functioning correctly on browser](./public/Ex3-18_Screenshot-1.png)
<br>
<br>![Second PNG of CHH02's Ex 3.18 frontend functioning correctly on browser](./public/Ex3-18_Screenshot-2.png)

#### Ex 3.19
- Expand the validation so that the name stored in the database has to be at least three characters long. Expand the frontend so that it displays some form of error message when a validation error occurs.

Backend changes:
```JS
### person.js ###

... // beginning of file

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3  // added built-in Mongoose minLength validation
  },
  number: String,
})

... // end of file

```

```JS
### index.js ###

... // beginning of file

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
    // added the following code to handle validation errors 
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

... // end of file

```

Frontend changes:
```JS
### App.jsx ###

... // beginning of file

const addPerson = (event) => {
  ...
  personService
    .create(nameObject)
    .then(returnedPerson => {...})
    .catch(error => {
      setTypeOfMessage('error')
      setMessage(error.response.data.error) // modified to display recieved (validation) error message
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    })
}

... // rest of file

```

#### Ex 3.20
- Add validation to your phonebook application, which will make sure that phone numbers are of the correct form. A phone number must:
  - have length of 8 or more
  - be formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers
    - eg. 09-1234556 and 040-22334455 are valid phone numbers
    - eg. 1234556, 1-22334455 and 10-22-334455 are invalid

- Use a Custom validator to implement the second part of the validation. If an HTTP POST request tries to add a person with an invalid phone number, the server should respond with an appropriate status code and error message.

```JS
### person.js ###

... // beginning of file

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: {
    type: String,
    minLength: 8, // Mongoose build-in validator to ensure 8 or longer
    // custom validator to ensure validly formatted phone numbers
    validate: {
      validator: numberToBeValidated => {
        return /^\d{2,3}-\d+$/.test(numberToBeValidated)
      },
      message: props => `${props.value} is not a valid phone number. Should be 2-3 numbers followed by a dash and 1 or more numbers (e.g., 09-1234556 and 040-22334455 are valid)`
    }
  },
})

... // end of file

```

#### Ex 3.21
- enerate a new "full stack" version of the application by creating a new production build of the frontend, and copying it to the backend directory. Push the latest version to Fly.io/Render and verify that everything works there as well.
- Note: I used render to do it, here is the [link](https://fullstack-phonebook-database.onrender.com)