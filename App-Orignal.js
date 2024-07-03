//Fetching axios module
const axios = require("axios");
const { header } = require("postman-request/lib/hawk");

//EndPoints
let city='Rajkot';
const P_Key = "47f27fc95068cfafad04fa4d05736895";

//getting url from Open weather api                                                 
const url1 = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${P_Key}`;

const GeoLocation = {
  method: "GET",
  url: url1,
  // header:{
  //   key:value
  // }
};        
                                                                                           
const Caller = async () => {
  //Async Function
  try {
    //Getting Langitudes And Longitudes
    const response = await axios.request(GeoLocation,(err,response)=>{/*if no error then undefined and response can be achieved by response.body*/});
    const lat = response.data[0].lat;
    const long = response.data[0].lon;

    //Weather Data
    const response2 = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${P_Key}`
    );

    //printing output statement
    console.log(`Date ${new Date().toString()}`);
    console.log(
      `Temprature in ${city} is\nKelvin - ${Math.round(
        response2.data.main.temp
      )}K\nCelcius - ${Math.round(
        response2.data.main.temp - 273.15
      )}C\nFarhenite - ${Math.round(
        (response2.data.main.temp - 273.15) * (9 / 5) + 32
      )}F`
    );
  } catch (error) {
    console.error(error); 
  }
};
                                              
Caller(); //Calling async function
// module.exports = {
//     setter,
//     Caller
// }                                                                                                                                                       