import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";
export default function weatherApp(){
    const [weatherInfo, setWeatherInfo] = useState(null);

    function updateInfo (newInfo){
        setWeatherInfo(newInfo);
    }
    return(
        <div>
            <SearchBox updateInfo={updateInfo}/>
            {weatherInfo && <InfoBox  info={weatherInfo}/>}
        </div>
    );
};