import React ,{useEffect, useState} from 'react'
import axios from 'axios';
import useTheme, { ThemeProvider } from './app/store';


function Quiz({category, setActive}) {
    const [quizData, setQuizData] = useState([]);
    const [questionNo, setQuestionNo] = useState(0);
    const [optionSelected, setOptionSelected] = useState(null);
    const [marks, setMarks] = useState(0);
    const [progress, setProgress] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [allowNull, setAllowNull] = useState(true);
   

    const {themeMode, textMode, borderColor} = useTheme();

  
    useEffect(()=>{
        axios.get(`https://my-json-server.typicode.com/sujal58/quiz-App/${category}`)
        .then(res => setQuizData(res.data))
        .catch(Error => console.log(Error))

    },[category, setQuizData]);


    const handleAnswer = (ansNumber) => {
      setOptionSelected(ansNumber);
    }

    const handleSubmit = () => {
      const selectedOption = quizData[questionNo].options[optionSelected];
      const correctOption = quizData[questionNo].correctOption;
      
       
      // console.log(selectedOption == correctOption);
      if(optionSelected !== null){
        setSubmitted(true);
        setAllowNull(false);
        if(selectedOption === correctOption){
        setTimeout(()=>{
          setQuestionNo((prev) => prev+1);
          setMarks((prev) => prev + 1);
          setProgress((prev)=> prev + 10);
          setSubmitted(false);
        }, 500);
          }else{
        setTimeout(()=>{
          setQuestionNo((prev) => prev+1);
          setProgress((prev)=> prev + 10);
          setSubmitted(false);
        }, 500);
        
      }
        setOptionSelected(null);
      }else{
        setAllowNull(false);
      }

      }

    
  return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 h-screen text-white ${textMode} ${themeMode} pt-10`}>
      {questionNo < 10 ? (
          <div className={`flex content-center flex-col items-center justify-center font-sansserif ${textMode}`}>
              
                    <p className='italic text-start mt-3 md:mt-5'>Question {questionNo+1} of {quizData?.length}</p><br />
                    <h2 className='text-xl md:text-4xl font-normal text-center'>{quizData[questionNo]?.question}</h2>
                    <br />
                  <div className={`progress-container h-3 ${themeMode === "bg-white" ? "bg-slate-800" : "bg-white"} w-72 md:w-96 rounded-xl mb-2 md:mt-10`}>
                    <div className={`progress bg-purple-700 h-full rounded-xl`} style={{width: `${progress}%`}}></div>
                  </div>
        </div>): 
        <div className="flex content-center flex-col items-center justify-center font-sansserif">
               <h2 className={`text-4xl font-normal text-center ${textMode}`}>You have Scored {marks} out of {quizData.length}.</h2><br />    
        </div>
        }
        
        <div className='flex justify-center flex-col items-center font-serif text-xl'>
          <p className='text-red-600 text-lg font-bold'>{allowNull ?"":"Please select one option"}</p>
          {quizData[questionNo]?.options.map((optionVal, index)=>{
            return(<div className={`flex justify-center items-center h-10 md:h-12 lg:h-14 w-72 md:w-80 rounded-xl mb-3 md:mb-4 cursor-pointer border-2 border-solid ${borderColor} ${textMode} ${optionSelected === index ? "bg-blue-300 font-bold" : `${themeMode}`} ${(submitted && (optionVal === quizData[questionNo].correctOption)) ? "bg-green-600" : ""} ${(index === optionSelected && optionVal != quizData[questionNo].correctOption && submitted) ? "bg-red-700": `${themeMode}`}`} key={index} onClick={()=>handleAnswer(index)}>
            <p className={`text-base md:text-xl lg:text-lg xl:text-xl 2xl:text-xl text-center`} key={optionVal}>{optionVal}</p>
          </div>
          )})}
          {(questionNo < 10) ? (
          <div className="flex justify-center items-center h-12 w-72 md:w-80 lg:w-80 xl:w-80 2xl:w-80 bg-purple-700 text-white rounded-xl mb-4 cursor-pointer">
            <input type="button" className='text-2xl cursor-pointer' value="Submit answer"  onClick={handleSubmit}/>
          </div>) : 
            <input type="button" className={`text-2xl cursor-pointer border-2 p-3 rounded-xl border-solid ${borderColor} ${textMode}`} value="Return to Home"  onClick={()=>{setActive(false)}}/>
           } 
        </div>
      </div>
  )
}

export default Quiz