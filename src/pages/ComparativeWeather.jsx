import { useState,useEffect } from 'react'
import Header from '../components/Header'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts'
import { FaCheckCircle } from 'react-icons/fa'
import axios from 'axios'

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
};



const ComparativeWeather = () => {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startWeatherData, setStartWeatherData] = useState(null);
  const [endWeatherData, setEndWeatherData] = useState();
  const [location, setLocation] = useState("lagos");

  const handleStartDataChange = (e) => {
    setStartDate(e.target.value)
  };


  const handleEndDataChange = (e) => {
    setEndDate(e.target.value)
  };

  const handleSubmit = () => {
    if(startDate && endDate) {
      setStartWeatherData(fetchWeather(startDate))
      setEndWeatherData(fetchWeather(endDate))
    }
  }

  const fetchWeather = async (date) => {

    const apiKey = "25dd3b4a690e4c1b8fd111324242505";
  const response = `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${location}&dt=${date}`

  try {
    const responseData = await axios.get(response);
    return responseData.data;
  } catch(error) {
    console.log(error);
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

useEffect(() => {
  setCurrentLocation()
}, [location])

const prepareChartData = () => {
  if (!startWeatherData || !endWeatherData) return [];
  const data1 = startWeatherData.forecast.forecastday[0].hour.slice(0, 3);
  const data2 = endWeatherData.forecast.forecastday[0].hour.slice(0, 3);

  const chartData = data1.map((hour1, index) => {
    const hour2 = data2[index];
    return {
      time: hour1.time.split(' ')[1],
      temperature1: hour1.temp_c,
      temperature2: hour2.temp_c,
      humidity1: hour1.humidity,
      humidity2: hour2.humidity,
      pressure1: hour1.pressure_mb,
      pressure2: hour2.pressure_mb,
      wind1: hour1.wind_kph,
      wind2: hour2.wind_kph,
    };
  });
  console.log(chartData); // Log the prepared data to inspect
  return chartData;
};


  return (
    <div className='bg-[#0A192F] h-[100vh] overflow-x-hidden px-[5vw] w-[100vw] overflow-y-scroll'>
      <Header />
      <div className='mt-10'>
        <h1 className='text-white font-bold'>Comparative Weather Data</h1>
        <div className='py-3'>
          <h1 className='text-white'>Compare dates:</h1>
          <div className='flex'>
            <input type="text" onChange={handleStartDataChange} placeholder='Enter first date (YYYY-MM-DD)' className='w-[150px] bg-[#1A2E4F] mr-12 rounded-lg border border-[#919BA8] text-[10px] px-2' />
            <input type="text" onChange={handleEndDataChange} placeholder='Enter Second date (YYYY-MM-DD)' className='w-[150px] rounded-lg border border-[#919BA8] text-[10px] px-2  bg-[#1A2E4F] py-2' />
            <button onClick={handleSubmit} className="absolute right-7"><FaCheckCircle className="ml-4 text-2xl text-white" /></button>
          </div>
        </div>
      </div>
      <div className='bg-[#1A2E4F] h-[200px] rounded-lg border-8 border-[#1E3358]'>
        <div>
        <div className='ml-[20px]'>
          <div className='w-[10px] h-[10px] rounded-full bg-red-500 mt-[50px] '></div>
          <p className='text-[8px] text-white'>First date</p>
        </div>
        <div className='ml-[20px]'>
          <div className='w-[10px] h-[10px] rounded-full bg-white mt-2 '></div>
          <p className='text-[8px] text-white'>Second date</p>
        </div>
        </div>
        {startWeatherData && endWeatherData && (
        <div>
          <h2>Weather Comparison (Next 3 Hours)</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={prepareChartData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="temperature1" fill="#8884d8" name={`Temperature on ${startDate}`} />
              <Bar dataKey="temperature2" fill="#82ca9d" name={`Temperature on ${endDate}`} />
              <Bar dataKey="humidity1" fill="#ffbb28" name={`Humidity on ${startDate}`} />
              <Bar dataKey="humidity2" fill="#ff8042" name={`Humidity on ${endDate}`} />
              <Bar dataKey="pressure1" fill="#0088FE" name={`Pressure on ${startDate}`} />
              <Bar dataKey="pressure2" fill="#00C49F" name={`Pressure on ${endDate}`} />
              <Bar dataKey="wind1" fill="#FF8042" name={`Wind on ${startDate}`} />
              <Bar dataKey="wind2" fill="#FFBB28" name={`Wind on ${endDate}`} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
      </div>
    </div>
  )
}

export default ComparativeWeather