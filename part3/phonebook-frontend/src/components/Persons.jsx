const Persons = ({personsToShow, deletePerson}) => {    
    return (
        <>
            {personsToShow.map(person => <li key={person.name}>{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button></li>)}
        </>
    )
}

export default Persons