import React ,{useEffect, useState} from 'react'
import axios from 'axios';
import useTheme, { ThemeProvider } from './app/store';


function Quiz({category}) {
    const [quizData, setQuizData] = useState([]);
    const [questionNo, setQuestionNo] = useState(0);
    const [optionSelected, setOptionSelected] = useState();
    const [isCorrect, setIscorrect] = useState(true);
    const [marks, setMarks] = useState(0);

    const {themeMode, textMode, borderColor} = useTheme();

  
    useEffect(()=>{
        axios.get("../db.json")
        .then(res => setQuizData(res.data[category]))
        .catch(Error => console.log(Error))

    },[category, setQuizData]);


    const handleAnswer = (ansNumber) => {
      setOptionSelected(ansNumber);
    }

    const handleSubmit = () => {
      const selectedOption = quizData[questionNo].options[optionSelected];
      const correctOption = quizData[questionNo].correctOption;
      console.log(selectedOption == correctOption);
      if(selectedOption == correctOption){
        setTimeout(()=>{

        }, 500);
        setQuestionNo((prev) => prev+1);
        setMarks(marks+1);
        setIscorrect(true);
      }else{
        setIscorrect(false);

      }
    }


  return (
   
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 h-screen text-white ${textMode} ${themeMode}`}>
      {questionNo < 10 ? (
          <div className={`flex content-center flex-col items-center justify-center font-sansserif ${textMode}`}>
               {isCorrect ? (
                <>
                <p className='italic text-start'>Question {questionNo+1} of {quizData?.length}</p><br />
              <h2 className='text-4xl font-normal text-center'>{quizData[questionNo]?.question}</h2>
              <br />
              <div className='bg-white'>
                <input type="range" name="rage" id="" maxLength={quizData?.length + 1} minLength={1}/> 
                
               </div>
                </>
               ): 
               <>
               {/* <h2 className='text-4xl font-normal text-center'>You have Scored {marks} out of {quizData.length}.</h2><br /> */}
               <h2 className='text-4xl font-normal text-center text-red-900'>Please select a correct option</h2><br />

               <h2 className='text-4xl font-normal text-center'>{quizData[questionNo]?.question}</h2>

               </>
               
               } 
        </div>): 
        <div className="flex content-center flex-col items-center justify-center font-sansserif">
               <h2 className='text-4xl font-normal text-center'>You have Scored {marks} out of {quizData.length}.</h2><br />    
        </div>
        }
        
        <div className='flex justify-center flex-col items-center font-serif text-xl'>
          
          {quizData[questionNo]?.options.map((optionVal, index)=>{
            return(<div className={`flex justify-center items-center h-12 w-72 md:w-80 lg:w-80 xl:w-80 2xl:w-80  rounded-xl mb-4 cursor-pointer border-2 border-solid ${borderColor} ${textMode} ${optionSelected === index ? "bg-yellow-300 text-blue-800" : `${themeMode}`}`} key={index} onClick={()=>handleAnswer(index)}>
            <p className={`text-base lg:text-lg xl:text-xl 2xl:text-xl text-center`} key={optionVal}>{optionVal}</p>
          </div>
          )})}
          {(questionNo < 10) ? (
          <div className="flex justify-center items-center h-12 w-72 md:w-80 lg:w-80 xl:w-80 2xl:w-80 bg-purple-700 text-white rounded-xl mb-4 cursor-pointer">
            <input type="button" className='text-2xl cursor-pointer' value="Submit answer"  onClick={handleSubmit}/>
          </div>) : 
            <input type="button" className='text-2xl cursor-pointer' value="Return to Home"  onClick={handleSubmit}/>
           } 
        </div>
      </div>
   
    
  )
}

export default Quiz