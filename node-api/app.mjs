import fetch from "node-fetch";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors())

app.listen(3000, () => {
    console.log("Express server up and running on port 3000");
})

app.get('/', (req, res) => {
    res.write("<h1>Hi</h1>");
})

app.get('/api', async (req, res) => {
    let lat = req.query.lat;
    let lng = req.query.lng;
    let loc = lat + "," + lng; 
    const tomorrow_api_key = "J3UE83FfZ4JyTmnWXHfaCS7V3l7KmCAd";
    try {
    
        let call2 = await fetch("https://api.tomorrow.io/v4/timelines?location="+loc + "&fields=temperature,temperatureApparent,temperatureMin,temperatureMax,windSpeed,windDirection,humidity,pressureSeaLevel,uvIndex,weatherCode,precipitationProbability,precipitationType,sunriseTime,sunsetTime,visibility,moonPhase,cloudCover&timesteps=1h,1d&units=imperial&timezone=America/Los_Angeles&apikey="+tomorrow_api_key, {
            method: 'get', 
            headers:{
            'Content-Type': 'application/json'
            }
        });
        let weather = await call2.json();
        console.log(weather);
        res.send(weather);
    
    } catch (e) {
        console.log(`Error: ${e}`)
    }
})