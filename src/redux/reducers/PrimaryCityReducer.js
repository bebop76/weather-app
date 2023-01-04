import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    defaultCity: {
        id: 0,
        cityName: "new york city",
        country: "us",
    },
    weatPrimaryCity: null,
    forecastPrimaryCity: []
}

export const primaryCitySlice = createSlice({
    name: "primaryCity",
    initialState,
    reducers: {
        //recupera il tempo da Primary City
        set_weatherPC: (state, action) => {
            state.weatPrimaryCity = action.payload
            //cambia la città e la country a defaultCity
            state.defaultCity.cityName = action.payload.name
            state.defaultCity.country = action.payload.sys.country
            //aggiunge l'id di openweathermap a defaultcity
            state.defaultCity.id = action.payload.id
        },
        //recupera le previsioni per primaryCity
        set_forecastPC: (state, action) => {
            state.forecastPrimaryCity = action.payload
        },
        //cambia la città primaria
        changePC: (state, action) => {
            state.defaultCity = action.payload
        }
    }
})

export const { set_weatherPC, set_forecastPC, changePC } = primaryCitySlice.actions

export default primaryCitySlice.reducer