import React from "react";
import { fetchDate } from '../../utils/utils'
import { useSelector } from "react-redux";

const Main = () => {
    const isLoading = useSelector((state) => state.isLoading.isLoading)
    const weatPrimaryCity = useSelector((state) => state.primaryCity.weatPrimaryCity)
    const isError = useSelector((state) => state.isError.isError)
    

    return (
        <div className="main">
            <div className="temperature">
                <div>
                    <div className="row">
                        {!isLoading && !isError ?
                            <div>
                                <h2>{Math.round(weatPrimaryCity.main.temp)}&#176;</h2>
                                <div className="sunicon"><img style={{ width: '100%' }} src={`http://openweathermap.org/img/w/${weatPrimaryCity.weather[0].icon}.png`} /></div>
                            </div>
                            :
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status"></div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {!isLoading && !isError ?
                <>
                    <div className="info">
                        <h2><b>{weatPrimaryCity.name}</b></h2>
                        <h4>{fetchDate()}</h4>
                        <p>{weatPrimaryCity.weather[0].description}</p>
                    </div>
                </>
                :
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status"></div>
                </div>
            }
        </div>
    )
}

export default Main