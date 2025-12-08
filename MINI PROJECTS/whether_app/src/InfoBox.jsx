import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import SunnyIcon from '@mui/icons-material/Sunny';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import SevereColdIcon from '@mui/icons-material/SevereCold';
import './InfoBox.css';


export default function InfoBox({info}){
    const img="https://images.unsplash.com/photo-1626019866260-d9e0bb648634?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2xvdWR5JTIwc2t5fGVufDB8fDB8fHww";
   
    const Hot_img="https://images.unsplash.com/photo-1606170034961-ee40e2dbe6bf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3VubnklMjB3ZWF0aGVyfGVufDB8fDB8fHww";
    const Cold_img="https://images.unsplash.com/photo-1612208695882-02f2322b7fee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sZCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D";
    const rain_img="https://media.istockphoto.com/id/498063665/photo/rainy-landscape.jpg?s=2048x2048&w=is&k=20&c=X8ecxMSWW5AaLFBxlzhxvzKSnCy_9apOlhvlJCOp-YU=";
    return(
        <div className="InfoBox">
        <div className='cardContainer'>
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
        sx={{ height: 140 }}
        image={info.humidity>80
            ? rain_img
            :info.temp>=15
            ? Hot_img
            :Cold_img}
        title="green iguana"
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