import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSCFromPC } from "../../redux/reducers/SecondaryCitiesReducer";

const AddBtn = () => {
    const dispatch = useDispatch()
    const primaryCity = useSelector((state) => state.primaryCity.defaultCity)
    const secondaryCities = useSelector((state) => state.secondaryCities.otherCities)

    //funzione che impedisce di aggiungere 2 citta secondarie uguali
    const check = () => {
        let trovato = false
        secondaryCities.map(singleCity => {
        if ( singleCity.id === primaryCity.id ) trovato = true
        })
        if (trovato){
            alert("City already added")
        }else{
            dispatch(addSCFromPC(primaryCity))
        }
    }
    return(
    <div className="adding">
        <button onClick={() => check()}><ion-icon name="add-outline" size="small"></ion-icon></button>
        <span><b>Aggiungi città</b></span>
    </div>
    )
}

export default AddBtn