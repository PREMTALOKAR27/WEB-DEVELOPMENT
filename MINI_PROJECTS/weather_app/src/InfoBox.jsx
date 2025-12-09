import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import SunnyIcon from '@mui/icons-material/Sunny';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import SevereColdIcon from '@mui/icons-material/SevereCold';
import './InfoBox.css';
import Hot from './assets/hot.jpg';
import Cold from './assets/cold.jpg';
import Rain from './assets/rain.jpg';


export default function InfoBox({info}){
    const Hot_img=Hot;
    const Cold_img=Cold;
    const rain_img=Rain;

    return(
        <div className="InfoBox">
        <div className='cardContainer'>
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
        sx={{ height: 150 }}
        image={info.humidity>80
            ? rain_img
            :info.temp>=15
            ? Hot_img
            :Cold_img}
        title="hot weather"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {info.city} {
            info.humidity>80
            ? <ThunderstormIcon/>
            :info.temp>=15
            ? <SunnyIcon/>
            :<SevereColdIcon/>
          }
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}  component={"span"}>
         <p>Temperature ={info.temp}&deg;C</p>
         <p>Min Temperature ={info.tempMin}&deg;C</p>
         <p>Max Temperature ={info.tempMax}&deg;C</p>
         <p>Humidity ={info.humidity}%</p>
         <p>The weather can be described as <i>{info.weather}</i> and feels like {info.feelsLike}&deg;C</p>
         
        </Typography>
      </CardContent>
    
    </Card>
        </div>
        </div>
    );
};