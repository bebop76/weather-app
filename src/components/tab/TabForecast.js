import React from "react";
import { fetchDate } from "../../utils/utils";
import { useSelector } from "react-redux";

const TabForecast = () => {

    const isLoading = useSelector((state) => state.isLoading.isLoading)
    const weatPrimaryCity = useSelector((state) => state.primaryCity.weatPrimaryCity)
    const forecastPrimaryCity = useSelector((state) => state.primaryCity.forecastPrimaryCity)
    const isError = useSelector((state) => state.isError.isError)

    const windChecking = (speed) => {
        if (speed < 5) {
            return "No wind"
        }
        if (speed >= 5 && speed < 10) {
            return "Soft wind"
        }
        if (speed >= 10 && speed < 20) {
            return "Moderate wind"
        }
        if (speed > 20) {
            return "Strong wind"
        }
    }
    //formato per il giorno della settimana
    const forecastGetDay = timestamp => {
        let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        let date = new Date(timestamp * 1000)
        return week[date.getDay()]
    }
    //formato per la data nel pannello wind
    const formatDateWindPanel = () => {
        let n = /\d+/
        let d = fetchDate()
        return d.substring(0, 3) + ', ' + d.match(n) + ' ' + d.substr(d.indexOf(d.match(',')) + 1, 4)
    }

    return (
        <div className="tab">
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"><b>This week</b></button>
                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false"><b>This month</b></button>
                </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div className="tabcard">
                        {!isLoading && !isError ?
                            <div className="row">
                                <div className="col-md-4 colonna">
                                    <div className="day">
                                        <h4>{forecastGetDay(forecastPrimaryCity.list[7].dt)}</h4>
                                        <div className="temp">{Math.round(forecastPrimaryCity.list[7].main.temp)}&#176;</div>
                                        <div className="wea-icon"><img src={`http://openweathermap.org/img/w/${forecastPrimaryCity.list[7].weather[0].icon}.png`} /></div>
                                    </div>
                                </div>
                                <div className="col-md-4 colonna">
                                    <div className="day">
                                        <h4>{forecastGetDay(forecastPrimaryCity.list[15].dt)}</h4>
                                        <div className="temp">{Math.round(forecastPrimaryCity.list[15].main.temp)}&#176;</div>
                                        <div className="wea-icon"><img src={`http://openweathermap.org/img/w/${forecastPrimaryCity.list[15].weather[0].icon}.png`} /></div>
                                    </div>
                                </div>
                                <div className="col-md-4 colonna">
                                    <div className="day">
                                        <h3>{forecastGetDay(forecastPrimaryCity.list[23].dt)}</h3>
                                        <div className="temp">{Math.round(forecastPrimaryCity.list[23].main.temp)}&#176;</div>
                                        <div className="wea-icon"><img src={`http://openweathermap.org/img/w/${forecastPrimaryCity.list[23].weather[0].icon}.png`} /></div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status"></div>
                            </div>
                        }
                        <div className="row">
                            <div className="dots">
                                <span>&#x2022;</span><span>&#x2022;</span><span>&#x2022;</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <div className="tabcard">
                        <div className="generalinfo">
                            <div className="col-md-5">
                                <div className="firstcontainer">
                                    <p>{formatDateWindPanel()}</p>
                                    <div id="windicon"></div>
                                </div>
                            </div>
                            <div className="col-md-7">
                                {!isLoading && !isError ?
                                    <div className="secondcontainer">
                                        <h4>{Math.round(weatPrimaryCity.main.temp)}&#176;</h4>
                                        <p>{windChecking(weatPrimaryCity.wind.speed)}</p>
                                        <br />
                                        <p>{`The high will be ${Math.round(weatPrimaryCity.main.temp_max)}`}&#176;C, {`the low will be ${Math.round(weatPrimaryCity.main.temp_min)}`}&#176;C.</p>
                                        <br />
                                        <p>Humidity: {weatPrimaryCity.main.humidity}%<br />
                                            Pressure: {`${weatPrimaryCity.main.pressure}`} bar<br />
                                            Dew point: 3&#176;C</p>
                                    </div>
                                    :
                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border" role="status"></div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="dots">
                                <span>&#x2022;</span><span>&#x2022;</span><span>&#x2022;</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TabForecast