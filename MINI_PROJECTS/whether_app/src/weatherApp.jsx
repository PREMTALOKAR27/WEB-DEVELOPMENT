import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";
export default function weatherApp(){
    const [weatherInfo, setWeatherInfo] = useState({
        city: "akola",
        temp: 24.84,
        tempMin: 18.33,
        tempMax: 29.44,
        humidity: 78,
        feelsLike: 26.12,
        weather:"clear sky"
    });

    function updateInfo (newInfo){
        setWeatherInfo(newInfo);
    }
    return(
        <div>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox  info={weatherInfo}/>
        </div>
    );
};