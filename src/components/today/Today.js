import React from "react";
import Dot from "./Dot";

const Today = () => {
    return (
        <div className="today">
            <h2>Today</h2>
            <div className="forecastHours">
                <div className="row"><p align="center"><b>Now</b></p></div>
                <Dot />
            </div>
            <div className="trgradient"></div>
        </div>
    )
}

export default Today