import React, { useEffect, useState } from 'react'
import useTheme, { ThemeContext } from '../app/store';

function Navbar() {


  const {themeMode, textMode, ToogleTheme} = useTheme();
  
  return (
    <div className={`text-center ${themeMode} ${textMode} absolute top-3 md:top-10 flex justify-around item-center w-screen`}>
        <div className="selectedContent">Show which topic is selected</div>
        <div className="toogleBar">
          <input type="checkbox" name="modechange" id=""
           onChange={ToogleTheme}/>
        </div>
    </div>
  )
}

export default Navbar