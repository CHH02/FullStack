const Persons = ({personsToShow}) => {    
    return (
        <>
            {personsToShow.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
        </>
    )
}

export default Persons