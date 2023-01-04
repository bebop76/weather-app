import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    otherCities: [
        { id: 0, cityName: "Roma", country: "it"},
        { id: 0, cityName: "firenze", country: "it"},
    ],
    weatSecondaryCities: []
}

export const secondaryCitiesSlice = createSlice({
    name: "secondaryCities",
    initialState,
    reducers: {
        //recupera il tempo dalle città secondarie e gli assegna l'id di openweathermap
        set_weatherSC: ( state, action ) => {
            state.weatSecondaryCities = action.payload
            state.weatSecondaryCities.map((singleId, i) =>{
                return state.otherCities[i].id = singleId.id  
            })
        },
        //aggiunge la città corrente alla lista delle città secondarie
        addSCFromPC: ( state, action ) => {
            state.otherCities = [action.payload, ...state.otherCities]
        },
        //elimina la città secondaria selezionata
        deleteCity: ( state, action ) => {
            state.otherCities = state.otherCities.filter(city => city.id !== action.payload)
        }
    }
})

export const { set_weatherSC, addSCFromPC, deleteCity } = secondaryCitiesSlice.actions

export default secondaryCitiesSlice.reducer