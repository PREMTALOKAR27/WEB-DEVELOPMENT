import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';
import { useState } from 'react';

export default function SearchBox({updateInfo}){
    let [city, setCity] =useState('');
    let [error, setError]=useState(false);

    const Api_url=import.meta.env.VITE_API_URL;
    const Api_key=import.meta.env.VITE_API_KEY;

    let getWeatherInfo= async ()=>{

        try{
             let data=await fetch(`${Api_url}?q=${city}&appid=${Api_key}&units=metric`);
        let jsonData=await data.json();

        let result={
            city:city,
            temp: jsonData.main.temp,
            tempMin: jsonData.main.temp_min,
            tempMax: jsonData.main.temp_max,
            humidity: jsonData.main.humidity,
            feelsLike: jsonData.main.feels_like,
            weather: jsonData.weather[0].description
        }
        return result;
        }
        catch(e){
            throw e;
           
        }
       
    }


    let handleChange=(e)=>{
        setCity(e.target.value);
    }

    let handleSubmit= async (e)=>{
        try{
            e.preventDefault();
        setCity('');
        setError(false);
        let newinfo=await getWeatherInfo({city});
        console.log("Searching weather for city:", city);
        updateInfo(newinfo);
        }
        catch(e){
            setError(true);
            updateInfo(null);
        }
        
    }
    return(
        <div className="search-box">
            <h1>Weather App</h1>
            <form action="">
                <TextField id="outlined-basic" label="Enter City" variant="outlined" value={city} onChange={handleChange}/>
                <br /> <br />
                <Button variant="contained" type='submit' onClick={handleSubmit}>Search</Button>
                {error && <h1 style={{color: "red"}}>No such place exists !</h1>}
            </form>

        </div>
    );
};