import Header from '../components/Header'

const ComparativeWeather = () => {
  return (
    <div className='bg-[#0A192F] h-[100vh] overflow-x-hidden px-[5vw] w-[100vw] overflow-y-scroll'>
      <Header />
      <div className='mt-10'>
        <h1 className='text-white font-bold'>Comparative Weather Data</h1>
        <div className='py-3'>
          <h1 className='text-white'>Compare dates:</h1>
          <div className='flex'>
            <input type="text" placeholder='Enter first date (MM/DD/YYYY)' className='w-[150px] bg-[#1A2E4F] mr-12 rounded-lg border border-[#919BA8] text-[10px] px-2' />
            <input type="text" placeholder='Enter Second date (MM/DD/YYYY)' className='w-[150px] rounded-lg border border-[#919BA8] text-[10px] px-2  bg-[#1A2E4F] py-2' />
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
      </div>
    </div>
  )
}

export default ComparativeWeather