import React from "react";
import AddBtn from '../components/addBtn/AddBtn'
import City from '../components/city/City'
import Localization from '../components/localization/Localization'
import Main from '../components/main/Main'
import Search from '../components/search/Search'
import TabForecast from '../components/tab/TabForecast'
import Today from '../components/today/Today'
import { useSelector } from "react-redux";

const Home = () => {

    const weatSecondaryCities = useSelector((state) => state.secondaryCities.weatSecondaryCities)
    const secondaryCities = useSelector((state) => state.secondaryCities.otherCities)
    const isError = useSelector((state) => state.isError.isError)
    

    return (
        <div className="mainContainer">
            {isError && alert(isError)}
            <div className="row">
                <div className="col-md-8">
                    <Main />
                    <div className="row">
                        <div className="col-md-4">
                            <Today />
                        </div>
                        <div className="col-md-8">
                            <TabForecast />
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="controls">
                        <AddBtn />
                        {
                            secondaryCities.length > 0 ?
                            weatSecondaryCities.map((city, i) => (
                                <City 
                                    key={Math.round(Math.random() * 100000)} 
                                    city={city} 
                                    cla={i % 2 === 0 ? "card1" : "card2"} 
                                    />
                            ))
                            :
                            null
                        }
                        <Search />
                        <Localization />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home