import { CiSun } from "react-icons/ci";
import { CiCloud } from "react-icons/ci";
import { CiCloudDrizzle } from "react-icons/ci";
import { CiTempHigh } from "react-icons/ci";
import { WiHumidity } from "react-icons/wi";
import { FaCompressArrowsAlt } from "react-icons/fa";
import { FaWind } from "react-icons/fa";
import { MdVisibility } from "react-icons/md";
import { FaDroplet } from "react-icons/fa6";
import { MdFoggy } from "react-icons/md";
import ComparativeGraph from "../components/ComparativeGraph";
import Header from "../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

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


// eslint-disable-next-line react/prop-types
const Home = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [location, setLocation] = useState("lagos");
  const [dayName, setDayName] = useState("");


  const handleLocationChange = (newCity) => {
    setLocation(newCity);
  }



  useEffect(() => {
    const days = ["Sunady", "Monday", "Tuseday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const date = new Date();
    const dayIndex = date.getDay();

    setDayName(days[dayIndex])
  },[])

    const fetchWeather = async (days) => {

      const apiKey = "25dd3b4a690e4c1b8fd111324242505";
      const currentUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=${days}&aqi=no&alerts=no`;

      try {
        const currentRespond = await axios.get(currentUrl);
        console.log(currentRespond);
        setCurrentWeather(currentRespond.data);
      } catch (error) {
        console.error(error)
      }
    };


    console.log(currentWeather);

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

    useEffect(() => {
      setCurrentLocation()
    }, [location])


  
    useEffect(() => {
      
    //  if(parseInt(currentWeather.location.localtime.slice(10, 12)) <= 4){
    //   setDayparts("Midnight")
    //  } else if(parseInt(currentWeather.location.localtime.slice(10, 12)) > 4 && parseInt(currentWeather.location.localtime.slice(10, 12)) <= 6) {
    //   setDayparts("Early morning")
    //  } else if(parseInt(currentWeather.location.localtime.slice(10, 12)) > 6 && parseInt(currentWeather.location.localtime.slice(10, 12)) <= 11) {
    //   setDayparts("Morning")
    //  } else if (parseInt(currentWeather.location.localtime.slice(10, 12)) > 11 && parseInt(currentWeather.location.localtime.slice(10, 12)) <= 17) {
    //   setDayparts("Afternoon")
    //  } else if (parseInt(currentWeather.location.localtime.slice(10, 12)) > 17 && parseInt(currentWeather.location.localtime.slice(10, 12)) <= 19) {
    //   setDayparts("Evening")
    //  } else if (parseInt(currentWeather.location.localtime.slice(10, 12)) > 19 && parseInt(currentWeather.location.localtime.slice(10, 12)) <= 23) {
    //   setDayparts("Evening")
    //  } else {
    //   setDayparts("Morning")
    //  }

  },[currentWeather])


  return (
    <div className='bg-[#0A192F] h-full overflow-x-hidden px-[5vw] w-[100vw]'>
     <Header onCityChange={handleLocationChange} />
      {currentWeather ? (<div>
        <div className="w-full mt-14 h-[30vh] bg-[#1A2E4F] bg-cover bg-center rounded-3xl p-2">
        <div className="flex flex-row text-white  ">
          <div>
            <CiSun className=" text-[50px]" />
            <p className="text-6xl font-bold">{currentWeather.current.temp_c}&deg;</p>
            <p className="font-bold text-2xl">{currentWeather.current.condition.text}</p>
            <p>{currentWeather.location.name + ", " + currentWeather.location.country}</p>
          </div>
          <div className="ml-auto mt-auto ">
          <p className="text-right font-bold">{currentWeather.location.localtime.slice(10)}</p>
          <p className="text-right font-bold"> {dayName}</p>
          <p className="text-right font-bold">{currentWeather.location.localtime.slice(0, 11)}</p>
          </div>
        </div>
      </div>
      <div className="py-5 flex flex-row overflow-x-scroll whitespace-nowrap items-center">
      { 
        currentWeather.forecast.forecastday[0].hour.map((hourData, i) => (
          <div key={i} className="flex-none bg-[rgb(26,46,79)] h-[25vh] w-[30vw] rounded-2xl px-[5px] mr-[10px]">
          <CiCloud className=" text-[40px] text-white" />
          <p className="text-3xl font-bold text-white">{hourData.temp_c}&deg;</p>
          <p className="text-[10px] font-bold text-white">{hourData.condition.text}</p>
          <p className="text-white text-[10px]">{currentWeather.location.name}</p>
          <p className="text-[10px] font-bold text-white mt-2">{hourData.time}</p>
          <p className="text-[7px] text-white">Late Morning, Thursday</p>
        </div>
        ))
      }
      </div>
      <div className="mb-5">
        <div className="flex w-[90vw] px-5 py-3 bg-[#1A2E4F] rounded-2xl">
          <div>
            <div className="flex">
            <CiTempHigh className="text-white text-4xl" /> <span className="text-[12px] font-bold text-white">Temperature <br /> {currentWeather.current.temp_c}&deg;</span>
            </div>
            <div className="flex pt-2">
            <FaCompressArrowsAlt className="text-white text-2xl " /> <span className="text-[12px] font-bold text-white ml-2">Pressure <br />{currentWeather.current.pressure_mb} mb</span>
            </div>
            <div className="flex pt-2">
          <FaWind className="text-white text-3xl" /> <span className="text-[12px] font-bold text-white ml-2">Wind <br /> {currentWeather.current.wind_kph}km/h</span>
            </div>
            <div className="flex pt-2">
            <FaDroplet className="text-white text-4xl" /> <span className="text-[12px] font-bold text-white ml-2">Dew point <br /> {currentWeather.current.gust_kph}&deg;</span>
            </div>
          </div>
          <div className="ml-7">
          <div className="flex">
            <WiHumidity className="text-white text-2xl " /> <span className="text-[12px] font-bold text-white ml-2">Humidy <br /> {currentWeather.current.humidity}%</span>
            </div>
          <div className="flex pt-2">
            <CiCloudDrizzle className="text-white text-2xl " /> <span className="text-[12px] font-bold text-white ml-2">UV Index <br /> {currentWeather.current.uv}(High)</span>
            </div>
          <div className="flex pt-2">
            <MdVisibility className="text-white text-2xl " /> <span className="text-[12px] font-bold text-white ml-2">Visibilty <br /> {currentWeather.current.vis_km}km</span>
            </div>
          <div className="flex pt-2">
            <MdFoggy className="text-white text-2xl " /> <span className="text-[12px] font-bold text-white ml-2">Precipitation <br /> {currentWeather.current.precip} (dry condition)</span>
            </div>
          </div>
        </div>
      </div>
      <ComparativeGraph weatherData={currentWeather} /> 
      </div>) : (<div className="h-[100vh] w-[100vw] bg-[#0A192F] "><p className="text-white text-center mt-[40vh] text-4xl font-bold">Loading...</p></div>)}
    </div>
  )
}

export default Home