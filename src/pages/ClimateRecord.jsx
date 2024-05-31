/* eslint-disable react/prop-types */
import Header from "../components/Header"
import { CiCloudDrizzle } from "react-icons/ci"
import { FaTemperatureHalf } from "react-icons/fa6"
import { FaWind } from "react-icons/fa6"
import { FaDroplet } from "react-icons/fa6"
import { RiArrowDropDownLine } from "react-icons/ri"
import { FaCheckCircle } from "react-icons/fa"
import { useState, useEffect } from "react"
import axios from "axios";


const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if(!navigator.geolocation) {
      reject(new Error ("Geolocation not supported by browser"))
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },(error) => {reject(error)})
    }
  })
};

const getCityName = async (latitude, longitude) => {
  const apiKey = "2b900d0e2c684d49b90a0eb9d03f1b71"
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

  try{
    const response = await axios.get(url);
    const city = response.data.results[0].components.city;
    console.log(city);
    return city;
  } catch (error) {
    console.error(error);
  }
}

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, 0);
const day = String(currentDate.getDate()).padStart(2, 0);
const currentFormatDate = `${year}-${month}-${day}`



const ClimateRecord = () => {
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [location, setLocation] = useState("lagos");
  const [dateVis, setDateVis] = useState(false);
 const [date, setDate] = useState(currentFormatDate);
 const [inputValue, setInputValue] = useState("");


 const toggledateVis = () => {
  setDateVis(!dateVis)
 }

 const handleInput = (event) => {
  setInputValue(event.target.value)
 }

 const setDateValue = () => {
  setDate(inputValue);
  toggledateVis();
 }

 const handleLocationChange = (newCity) => {
  setLocation(newCity);
}


  useEffect(() => {
    
    const fetchWeather = async () => {

      const apiKey = "25dd3b4a690e4c1b8fd111324242505";
    const forecastUrl = `http://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${location}&dt=${date}`

    try {
      const forecastResponds = await axios.get(forecastUrl);
      console.log(forecastResponds);
      setWeatherForecast(forecastResponds.data)
      console.log(weatherForecast);
      
    }catch (error) {
      console.error(error)
    }
  };



    const setCurrentLocation = async () => {
      try {
        const position = await getCurrentLocation();
        const city = await getCityName(position.latitude, position.longitude);
        if(city) {
          setLocation(city);
        }
      } catch (error) {
        console.error(error)
      }
      fetchWeather();
    };

    setCurrentLocation()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[location, date]);

  return (
    <div className='bg-[#0A192F] h-full overflow-x-hidden px-[5vw] w-[100vw] overflow-y-scroll'>
      <Header onCityChange={handleLocationChange} />
      <h1 className="text-white font-bold text-sm mt-10 ">Climate Records</h1>
      <div className="mt-3">
        <h1 className="text-white">Filter by:</h1>
        <div className="mt-1 mb-4 flex">
          <button className="text-[#919BA8] border-[#919BA8] text-sm py-1 bg-[#1A2E4F] border-2 rounded-lg px-1 mr-5 flex"><p> Weather Condition </p><RiArrowDropDownLine className="ml-4 text-2xl"/></button>
          <button onClick={toggledateVis} className="text-[#919BA8] border-[#919BA8] text-sm py-1 bg-[#1A2E4F] border-2 rounded-lg px-2 flex ">Select Period <RiArrowDropDownLine className="ml-4 text-2xl"/></button>
          {
            dateVis && (<div>
              <input type="text" name="" id="" className="absolute right-7 mt-9 bg-[#1A2E4F] h-10 w- pl-2 border-2 border-[#919BA8] " placeholder="YYYY-MM-dd" value={inputValue} onChange={handleInput}/>
              <button onClick={setDateValue} className="absolute right-10 mt-11"><FaCheckCircle className="ml-4 text-2xl text-white" /></button>
              </div>)
          }
        </div>
        <div> { weatherForecast ? (<ul className="text-white flex flex-col py-2 rounded-xl px-1">
            {
              weatherForecast.forecast.forecastday[0].hour.map((hourData, i) => (
                <li key={i} className="bg-[#1A2E4F] mt-2 pl-3 py-3 rounded-lg">
                  <p className="flex text-[8px]">{hourData.time.slice(0, 10)} {weatherForecast.location.name} <CiCloudDrizzle className="mx-3 text-xl" /> <FaTemperatureHalf className="text-sm" /> {hourData.temp_c}&deg; <FaWind className="ml-3"/>{hourData.wind_mph}km/h <FaDroplet className="ml-3"/> {hourData.humidity}% <button className="ml-10">{hourData.time.slice(10, 16)}</button></p>
                </li>
              ))
            }
          </ul>) : (<div className=" px-8 h-[70vh] w-[100vw] bg-[#0A192F] "><p className="text-white text-center mt-[10vh] text-xl font-bold">No climate record available, refresh or set a valid city and date</p></div>)}
        </div>
      </div>
    </div>
  )
}

export default ClimateRecord