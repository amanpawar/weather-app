import express from 'express'
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config({ path: '../.env' });
const app = express()

app.use(express.json())

async function getData(location) {
  const url = `${process.env.WEATHER_API_BASE_URL}data/2.5/weather?q=${location}&appid=${process.env.API_KEY}&units=metric`;

  try {
    const response = await fetch(url);

    if (response.status == 500) {
      // Handle 500 response status codes as errors
      throw new Error(`Failed to fetch data. Status: ${response.status}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    // Handle any other errors that might occur during the fetch
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}


app.get(`/weather/:location`, async(req, res) => {
  var location = req.params['location']
  var resp = await getData(location);
  res.json(resp)
}) 

export default app