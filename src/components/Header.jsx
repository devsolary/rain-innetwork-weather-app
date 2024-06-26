/* eslint-disable react/prop-types */
import { useState } from "react"
import { CiSearch } from "react-icons/ci"
const Header = ({ onCityChange }) => {

  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleSubmit = () => {
    onCityChange(inputValue)
  }

  return (
    <div>
        <div className='mt-14 flex'>
        <p className='text-white mr-4 font-bold text-[12px] w-[30vw]'>RAIN -INNETWORK</p>
        <div className=' ml-[10vw] flex border-[1px] border-[#59677B] rounded-2xl bg-[#1A2E4F]'>
        <input type="text" placeholder='Enter City' className=' bg-transparent w-[35vw]  pl-2 text-[12px] text-[#59677B]' onChange={handleChange} value={inputValue} /> <button className='text-[#59677B]'><CiSearch className="mr-2" onClick={handleSubmit} /></button>
        </div>
      </div>
    </div>
  )
}

export default Header