import React from "react";
import { fetchDate, fetchTime } from '../../utils/utils'
import { useDispatch, useSelector } from "react-redux";
import { deleteCity } from "../../redux/reducers/SecondaryCitiesReducer";

const City = ({ city, cla }) => {
    const isLoading = useSelector((state) => state.isLoading.isLoading)
    const isError = useSelector((state) => state.isError.isError)
    const dispatch = useDispatch()

    const handleDelete = ( cityToDel ) => {
        dispatch(deleteCity(cityToDel))
    }
    
    return (
        <div onClick={() => handleDelete(city.id)} className={cla} data-bs-toggle="tooltip" data-bs-placement="top" title="Click to erase">
            <div className="city">
                {!isLoading && !isError ?
                    <>
                        <h3><b>{city.name}</b></h3>
                        <p>{fetchDate()}</p>
                        <p>{fetchTime()}</p>
                    </>
                    :
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status"></div>
                    </div>
                }
            </div>
            <div className=""><img style={{ width: '100%' }} src={`http://openweathermap.org/img/w/${city.weather[0].icon}.png`} /></div>
            <div className="temp">{Math.round(city.main.temp)}&#176;</div>
        </div>
    )
}

export default City