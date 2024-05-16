import React, {useState, useEffect} from 'react'
import Quiz from '../Quiz';
import useTheme from '../app/store';




function Landing({handleSelectOption, option}) {
  const [active, setActive] = useState(false);
  const {themeMode, textMode, borderColor} = useTheme();
    

    
  const optionToChoose = ["HTML", "CSS", "JavaScript", "Accessibility"]

  const handleClick = (category) => {
    handleSelectOption(category);
    setActive(true);
  }


  return (
    (active ? <Quiz category={option} active = {setActive}/> :
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 h-screen ${themeMode} ${textMode}`}>
          <div className="flex content-center flex-col items-center justify-center font-sansserif">
              <h2 className=' text-4xl font-normal md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-6xl'>Welcome to the</h2>
              <h1 className='text-4xl font-bold md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-6xl'>Frontend Quiz!</h1>
          <p className='mt-7 text-lg text-left italic'>Pick a subject to get started.</p>
        </div>
        <div className='flex justify-center flex-col items-center font-serif text-xl'>
          {optionToChoose.map((optionVal, index)=>{
            return(<div className={`flex items-center justify-center h-12 w-80 rounded-xl mb-4 cursor-pointer gap-4 text-slate-800 ${themeMode} ${textMode} ${borderColor} box-border border-solid border-2 ring-2 `} onClick={() => handleClick(optionVal)} key={index}>
            {/* <i className='ml-3 p-1 rounded-xl text-red-400'><box-icon type='logo' name='html5'></box-icon></i> */}
            <p className='text-3xl' key={optionVal}>{optionVal}</p>
          </div>
          )})}
          
        </div>
      </div>
    )
  )
}

export default Landing