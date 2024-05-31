/* eslint-disable react/prop-types */
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";


// eslint-disable-next-line react/prop-types
const ComparativeGraph = ({ weatherData }) => {

  const prepareChartData = () => {
    if(!weatherData) return [];

    const today = weatherData.forecast.forecastday[0];
    return today.hour.slice(0, 4).map(hour => ({
      time: hour.time.split(" ")[1],
      temperature: hour.temp_c,
      humidity: hour.humidity,
      pressure: hour.pressure_mb,
    }))
  };

  return (
    <div className="flex w-[90vw] h-[40vh] px-5 py-3 bg-[#1A2E4F] rounded-2xl mb-10">
      <div className='w-full mb-10'>
        {
          weatherData && (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={prepareChartData()}>
                
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="temperature" fill="#F2585F"/>
                <Bar dataKey="humidity" fill="#D7E0EC" />
                <Bar dataKey="pressure" fill="#13203F" />
              </BarChart>
            </ResponsiveContainer>
          )
        }
      </div>
    </div>
  )
}

export default ComparativeGraph;