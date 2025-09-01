import {ZapIcon} from 'lucide-react'

const RateLimitedUI = () => {
  return (
    <div className='w-full h-screen bg-black/50 fixed top-0 left-0 flex flex-col justify-center items-center backdrop-blur-sm z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center'>
        <ZapIcon className='text-4xl text-yellow-400 mb-4'/>
        <h2 className='text-2xl font-bold mb-2'>Rate Limited</h2>
        <p className='text-gray-600 mb-4'>You have exceeded the maximum number of requests. Please try again later.</p>
        <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600' onClick={() => window.location.reload()}>Reload Page</button>
      </div>
    </div>
  )
}

export default RateLimitedUI