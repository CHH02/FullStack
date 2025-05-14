import { useEffect } from "react"

const Display = ({ data, weather, setToDisplay }) => {

    

    if (!data) {
        return ''
    } else if (data.length > 10) {
        return (
            <li>Too many matches, specify another filter</li>
        ) 
    } else if (data.length === 1) {      
        return (
            <> 
                <h1>{data[0].name.common}</h1>
                <p>Capital {data[0].capital[0]}</p>
                <p>Area {data[0].area}</p>
                <h2>Languages</h2>
                <ul>
                    {Object.values(data[0].languages).map(n => <li key={n}>{n}</li>)}
                </ul>
                <img src={data[0].flags.png} alt={`${data[0].name.common} flag`} />
                <h2>Weather in {data[0].capital[0]}</h2>
                {weather}
            </>
        )
    } else {
        return data.map(n => <li key={n.name.common}>{n.name.common} <button onClick={() => setToDisplay([n])} >show</button></li>)
    }
}

export default Display