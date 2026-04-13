const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

if (!password) {
  console.log('give password as argument')
  process.exit(1)
}

const url = `mongodb+srv://fullstack:${password}@cluster0.eeagjss.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

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
    }).catch(err => {
      console.log('Adding person to database failed with the following error message:\n');
      console.log(err);
      mongoose.connection.close()
      process.exit(1)
    })
}
// else if no data is given then just return all database entries so far 
else if (!name && !number) {
    Person.find({}).then(result => {
        console.log('phonebook:');
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      }).catch(err => {
        console.log('Getting all people from database failed with the following error message:\n');
        console.log(err);
        mongoose.connection.close()
        process.exit(1)
      })
}
// otherwise something must have gone wrong so go ahead and close connection to DB
else {
    mongoose.connection.close()
    console.log("Incomplete set of data, give a name and a number. Terminating connection... ");
    process.exit(1)   
}
