import React, { useState } from "react";
import Logic from "../../utils/Logic";
import { useDispatch } from "react-redux";
import { changePC } from "../../redux/reducers/PrimaryCityReducer";

const Search = () => {
    const [search, setSearch] = useState("")
    const { myApiKey } = Logic()
    const dispatch = useDispatch()


    const searchPressed = async (e) => {
        e.preventDefault()
        try {
            let url = ""
            //nel caso l'utente dovesse indicare anche la country per una ricerca migliore
            const cityFound = search.split(",")
            const city = cityFound[0]
            const country = cityFound[1]
            if (cityFound.length !== 2) {
                url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${myApiKey}`
            } else {
                url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${myApiKey}`

            }
            const data = await fetch(url)
            const response = await data.json()

            if (response.length === 0) throw Error("citta non trovata")

            dispatch(changePC({ cityName: response[0].name, country: response[0].country }))
            setSearch("")
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <>
            <h2 className="titleh2">Search</h2>
            <form>
                <input
                    type="search"
                    placeholder="ex: Miami"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    data-bs-toggle="tooltip" data-bs-placement="top" title="for more searching accurancy use city,xx for country"
                />
                <button type="submit" onClick={searchPressed}>Search</button>
            </form>
        </>
    )
}

export default Search