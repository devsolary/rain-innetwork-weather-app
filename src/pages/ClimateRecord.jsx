import Header from "../components/Header"
import { CiCloudDrizzle } from "react-icons/ci"
import { FaTemperatureHalf } from "react-icons/fa6"
import { FaWind } from "react-icons/fa6"
import { FaDroplet } from "react-icons/fa6"
import { RiArrowDropDownLine } from "react-icons/ri"



const ClimateRecord = () => {
  return (
    <div className='bg-[#0A192F] h-[100vh] overflow-x-hidden px-[5vw] w-[100vw] overflow-y-scroll'>
      <Header />
      <h1 className="text-white font-bold text-sm mt-10 ">Climate Records</h1>
      <div className="mt-3">
        <h1 className="text-white">Filter by:</h1>
        <div className="mt-1 mb-4 flex">
          <button className="text-[#919BA8] border-[#919BA8] text-sm py-1 bg-[#1A2E4F] border-2 rounded-lg px-1 mr-5 flex"><p> Weather Condition </p><RiArrowDropDownLine className="ml-4 text-2xl"/></button>
          <button className="text-[#919BA8] border-[#919BA8] text-sm py-1 bg-[#1A2E4F] border-2 rounded-lg px-2 flex ">Select Period <RiArrowDropDownLine className="ml-4 text-2xl"/></button>
        </div>
        <div>
          <div className="text-white flex py-2 bg-[#1A2E4F] rounded-xl px-4">
            <p className="flex text-[8px]">01/09/2022 abuja, Nigeria <CiCloudDrizzle className="mx-3 text-xl" /> <FaTemperatureHalf className="text-sm" /> 15&deg; <FaWind className="ml-3"/>15km/h <FaDroplet className="ml-1"/> 60% <button className="ml-10">view Details</button></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClimateRecord