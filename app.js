//Fetching axios module
const axios = require("axios");

//EndPoints
// let city='Rajkot';
const P_Key = "47f27fc95068cfafad04fa4d05736895";



const Caller = async (city) => {
  //getting url from Open weather api
  const url1 = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${P_Key}`;

  const GeoLocation = {
    method: "GET",
    url: url1,
    // header:{
    //   key:value
    // }
  };

  //Async Function
  try {
    //Getting Langitudes And Longitudes
    const response = await axios.get(url1);
    const lat = response.data[0].lat;
    const long = response.data[0].lon;

    //Weather Data
    const response2 = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${P_Key}`
    );

    return [Math.round(response2.data.main.temp), Math.round(response2.data.main.temp - 273.15), Math.round((response2.data.main.temp - 273.15) * (9 / 5) + 32)]
  } catch (error) {
    // console.error(error);
    return 'error'
  }
};

// Caller(); //Calling async function
module.exports = {
  Caller,
};
