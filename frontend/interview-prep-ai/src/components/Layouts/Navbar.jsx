import React from 'react'
import ProfileCard from '../cards/ProfileCard'
import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <div className='h-16 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-2.5 z-40 px-4 md:px-0 sticky top-0 '>
      <div className='container mx-auto flex items-center justify-between gap-5'>
        <Link to={"/"}>
        <h2 className='text-lg md:text-xl font-medium text-black leading-5'>
          Interview
        </h2>
        {/* <img src="/logo.png" width={150} className='absolute  top-0 left-0 ml-7 -mt-5' alt="" /> */}
        </Link>
        <ProfileCard/>
      </div>
    </div>
  )
}

export default Navbar