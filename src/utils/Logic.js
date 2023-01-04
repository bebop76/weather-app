import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { offLoading, onLoading } from "../redux/reducers/IsLoadingReducer";
import {set_weatherPC, set_forecastPC} from "../redux/reducers/PrimaryCityReducer"
import { set_weatherSC } from "../redux/reducers/SecondaryCitiesReducer"
import { setError, unsetError } from "../redux/reducers/IsErrorReducer";

// implementazione metodi che recuperano le previsioni del tempo
const Logic = () => {

    let myApiKey = "865a7989c8c93d644e49b503afe8e74d"
    let discoverCoordinatesLink = "http://api.openweathermap.org/geo/1.0/"
    let getWeatherLink = "https://api.openweathermap.org/data/2.5/"
    let getForecastLink = "http://api.openweathermap.org/data/2.5/"

    const dispatch = useDispatch()
    
    const primaryCity = useSelector((state) => state.primaryCity.defaultCity)
    const secondaryCities = useSelector((state) => state.secondaryCities.otherCities)
    
    
    const getCoordFromName = async () => {
        dispatch(onLoading())
        try {
            const data = await fetch(`${discoverCoordinatesLink}direct?q=${primaryCity.cityName},${primaryCity.country}&appid=${myApiKey}`)
            const response = await data.json()
            if (response.length === 0) {
                throw Error("Impossible to find city or country")
            }
            getWeatherFromCoord(response[0])
            dispatch(unsetError())
        } catch (error) {
            dispatch(offLoading())
            dispatch(setError(error.message))
        }

    }
    const getWeatherFromCoord = async (coord) => {
        dispatch(onLoading())
        try {
            const data2 = await fetch(`${getWeatherLink}weather?lat=${coord.lat}&lon=${coord.lon}&units=metric&APPID=${myApiKey}`)
            const response2 = await data2.json()

            if (response2.length === 0) {
                throw Error("Latitude or longitude error")
            }
            const foreData = await fetch(`${getForecastLink}forecast?lat=${coord.lat}&lon=${coord.lon}&units=metric&cnt=24&APPID=${myApiKey}`)
            const responseForecast = await foreData.json()

            if (responseForecast === 0) {
                throw Error("Impossible to get forecast")
            }
            dispatch(set_weatherPC(response2))
            dispatch(set_forecastPC(responseForecast))
            dispatch(unsetError())
            dispatch(offLoading())
        } catch (error) {
            dispatch(offLoading())
            dispatch(setError(error.message))
        }
    }
    //recupero previsioni delle città secondarie
    const getWeaSC = async (sc) => {
        try {
            const getWeatherFromOtherCities = await sc.map(async (item) => {
                const data = await fetch(`${discoverCoordinatesLink}direct?q=${item.cityName},${item.country}&appid=${myApiKey}`)
                const response = await data.json()
                const data2 = await fetch(`${getWeatherLink}weather?lat=${response[0].lat}&lon=${response[0].lon}&units=metric&APPID=${myApiKey}`)
                const response2 = await data2.json()
                return response2
            })
            const wea = await Promise.all(getWeatherFromOtherCities)
            if (wea.length === 0) {
                throw Error("Something in secondary cities was wrong")
            }
            dispatch(set_weatherSC(wea))
        } catch (error) {
            dispatch(offLoading())
            dispatch(setError(error.message))
        }
    }
    useEffect(() => {
        getCoordFromName()
        //se esistono in elenco città secondarie recupera le previsioni
        if (secondaryCities.length > 0) {
            getWeaSC(secondaryCities)
        }
    },[primaryCity, secondaryCities])

    return { getWeatherFromCoord, getCoordFromName, getWeaSC, myApiKey }
}

export default Logic