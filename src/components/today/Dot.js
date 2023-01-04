import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Dot = () => {
    const isLoading = useSelector((state) => state.isLoading.isLoading)
    const weatPrimaryCity = useSelector((state) => state.primaryCity.weatPrimaryCity)
    const forecastPrimaryCity = useSelector((state) => state.primaryCity.forecastPrimaryCity)
    const isError = useSelector((state) => state.isError.isError)

    //funzione usata per generare il formato ora am/pm
    const formatForecastHour = timestamp => {
        let date = new Date(timestamp * 1000)
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let amorpm = hours >= 12 ? 'p.m.' : 'a.m.'
        hours %= 12
        hours = hours ? hours : 12
        minutes = minutes < 10 ? '0' + minutes : minutes
        let strTime = `${hours} ${amorpm}`
        return strTime
    }

    return (
        <>
            {!isLoading && !isError ?
                <>
                    {/* POINT */}
                    <div className="row">
                        <div className="col-5">
                            <p align="center"><b>{Math.round(weatPrimaryCity.main.temp)}&#176;</b></p>
                        </div>
                        <div className="col-2 templine">
                            <div className="temppoint" id="firsttemppoint"></div>
                        </div>
                        <div className="col-5">
                            <p className="orario" align="center"></p>
                        </div>
                    </div>
                    {/* LINE */}
                    <div className="row">
                        <div className="col-5"></div>
                        <div className="col-2 templine">
                            <svg id="line" width="100%" height="50">
                                <defs>
                                    <linearGradient id="grd" x1="0" y1="0" x2="0" y2="150" gradientUnits="userSpaceOnUse">
                                        <stop offset="0%" style={{ stopColor: "rgb(213,226,250)", stopOpacity: "1" }} />
                                        <stop offset="100%" style={{ stopColor: "rgb(194,214,248)", stopOpacity: "0" }} />
                                    </linearGradient>
                                </defs>
                                <line x1="50%" y1="0" x2="50%" y2="90" strokeWidth="10" stroke="url(#grd)"></line>
                            </svg>
                        </div>
                        <div className="col-5"></div>
                    </div>
                    {/* POINT */}
                    <div className="row">
                        <div className="col-5">
                            <p align="center">{Math.round(forecastPrimaryCity.list[0].main.temp)}&#176;</p>
                        </div>
                        <div className="col-2 templine">
                            <div className="temppoint"></div>
                        </div>
                        <div className="col-5">
                            <p className="orario" align="center">{formatForecastHour(forecastPrimaryCity.list[0].dt)}</p>
                        </div>
                    </div>
                    {/* LINE */}
                    <div className="row">
                        <div className="col-5"></div>
                        <div className="col-2 templine">
                            <svg id="line" width="100%" height="50">
                                <defs>
                                    <linearGradient id="grd" x1="0" y1="0" x2="0" y2="150" gradientUnits="userSpaceOnUse">
                                        <stop offset="0%" style={{ stopColor: "rgb(213,226,250)", stopOpacity: "1" }} />
                                        <stop offset="100%" style={{ stopColor: "rgb(194,214,248)", stopOpacity: "0" }} />
                                    </linearGradient>
                                </defs>
                                <line x1="50%" y1="0" x2="50%" y2="90" strokeWidth="10" stroke="url(#grd)"></line>
                            </svg>
                        </div>
                        <div className="col-5"></div>
                    </div>
                    {/* POINT */}
                    <div className="row">
                        <div className="col-5">
                            <p align="center">{Math.round(forecastPrimaryCity.list[1].main.temp)}&#176;</p>
                        </div>
                        <div className="col-2 templine">
                            <div className="temppoint"></div>
                        </div>
                        <div className="col-5">
                            <p className="orario" align="center">{formatForecastHour(forecastPrimaryCity.list[1].dt)}</p>
                        </div>
                    </div>
                    {/* LINE */}
                    <div className="row">
                        <div className="col-5"></div>
                        <div className="col-2 templine">
                            <svg id="line" width="100%" height="50">
                                <defs>
                                    <linearGradient id="grd" x1="0" y1="0" x2="0" y2="150" gradientUnits="userSpaceOnUse">
                                        <stop offset="0%" style={{ stopColor: "rgb(213,226,250)", stopOpacity: "1" }} />
                                        <stop offset="100%" style={{ stopColor: "rgb(194,214,248)", stopOpacity: "0" }} />
                                    </linearGradient>
                                </defs>
                                <line x1="50%" y1="0" x2="50%" y2="90" strokeWidth="10" stroke="url(#grd)"></line>
                            </svg>
                        </div>
                        <div className="col-5"></div>
                    </div>
                    {/* POINT */}
                    <div className="row">
                        <div className="col-5">
                            <p align="center">{Math.round(forecastPrimaryCity.list[2].main.temp)}&#176;</p>
                        </div>
                        <div className="col-2 templine">
                            <div className="temppoint"></div>
                        </div>
                        <div className="col-5">
                            <p className="orario" align="center">{formatForecastHour(forecastPrimaryCity.list[2].dt)}</p>
                        </div>
                    </div>
                </>
                :
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status"></div>
                </div>
            }
        </>

    )
}

export default Dot