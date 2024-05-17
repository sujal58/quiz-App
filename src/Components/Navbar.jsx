import React, { useEffect, useState } from 'react'
import useTheme from '../app/store';
import { SunFill, MoonFill } from 'react-bootstrap-icons';



function Navbar({option}) {

  const {themeMode, textMode, ToogleTheme} = useTheme();
  
  return (
    
    <div className={`text-center ${themeMode} ${textMode} absolute top-5 md:top-10 flex justify-between md:justify-around item-center w-screen bg-transparent`}>
        <div className="selectedContent"><h1 className=' flex gap-2 font-bold text-xl leading-5 pl-3'>{option.icon}{option.name}</h1></div>
        <div className="toogleBar">
         <label className="inline-flex items-center cursor-pointer gap-3 pr-3">
          {/* <img src={moon} alt="LightMode" className='bg-white'/> */}
          <SunFill className='tetx-xl'/>
          <input type="checkbox" value="" className="sr-only peer"onChange={ToogleTheme}/>
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <MoonFill className='text-lg'/>
        </label>
        </div>
    </div>
    
  )
}

export default Navbar