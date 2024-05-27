import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ClimateRecord from './pages/ClimateRecord'
import ComparativeWeather from './pages/ComparativeWeather'
import Home from "./pages/Home"

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/climaterecord' element={<ClimateRecord />} />
        <Route path='/comparativewaether' element={<ComparativeWeather />} />
      </Routes>
    </Router>
  )
}

export default App
