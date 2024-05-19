import React, {useState, useEffect} from 'react'
import Quiz from '../Quiz';
import useTheme from '../app/store';
import { FiletypeHtml, FiletypeCss, FiletypeJs,UniversalAccess } from 'react-bootstrap-icons';




function Landing({handleSelectOption, option}) {
  const [active, setActive] = useState(false);
  const {themeMode, textMode, borderColor} = useTheme();
    

    
  // const optionToChoose = ["HTML", "CSS", "JavaScript", "Accessibility"]
  const optionToChoose = [
  { name: "HTML", icon: <FiletypeHtml/> },
  { name: "CSS", icon: <FiletypeCss/> },
  { name: "JavaScript", icon: <FiletypeJs/> },
  { name: "Accessibility", icon: <UniversalAccess/> }
];


  const handleClick = (category) => {
    handleSelectOption(category);
    setActive(true);
  }


  return (
    (active ? <Quiz category={option.name} setActive = {setActive}/> :
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 h-screen ${themeMode} ${textMode} pt-10`}>
          <div className="flex content-center flex-col items-center justify-center font-sansserif">
              <h2 className=' text-4xl font-normal md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-7xl'>Welcome to the</h2>
              <h1 className='text-4xl font-bold md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-8xl'>Frontend Quiz!</h1>
          <p className='mt-6 text-lg 2xl:text-2xl text-left italic'>Pick a subject to get started.</p>
        </div>
        <div className='flex justify-start sm:justify-center flex-col items-center font-serif text-xl'>
          {optionToChoose.map((optionVal, index)=>{
            return(<div className={`flex items-center justify-between h-12 2xl:h-24 w-11/12 md:w-10/12 md:h-14 2xl:w-6/12 rounded-xl 2xl:rounded-3xl mb-4 cursor-pointer gap-4 ${themeMode} ${textMode} ${borderColor} box-border border-solid border-2 ring-2 `} onClick={() => handleClick(optionVal)} key={index}>

            {/* <i className='ml-3 p-1 rounded-xl text-red-400'><box-icon type='logo' name='html5'></box-icon></i> */}
            <p className='text-2xl md:text-3xl 2xl:text-5xl flex gap-4' key={optionVal.name}>{optionVal.icon}{optionVal.name}</p>
          </div>
          )})}
          
        </div>
      </div>
    )
  )
}

export default Landing