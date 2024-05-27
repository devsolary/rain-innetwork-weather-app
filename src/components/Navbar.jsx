import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen)
  }

  return (
    <div className='absolute'>
      <div className='text-white'>
      <button onClick={toggleNavbar}>{navbarOpen ? <IoMdClose className="absolute p-2 text-4xl border-2 ml-2" /> : <FaBars className="absolute p-2 text-4xl border-2 ml-2" /> }</button>
      </div>
      <div className={`mt-7 bg-[#1A2E4F] pl-5 h-[100vh] pt-5 pr-10 transition-transform ${navbarOpen ? "translate-x-0" : "translate-x-[-100vw]"}`}>
        <ul>
          <li onClick={toggleNavbar} className='text-white'><Link to="/">Home</Link></li>
          <li onClick={toggleNavbar} className='text-white'><Link to="/climaterecord">Climate Records</Link></li>
          <li onClick={toggleNavbar} className='text-white'><Link to="/comparativewaether">Comparative Weather Data</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar