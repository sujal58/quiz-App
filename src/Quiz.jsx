import React ,{useEffect, useState} from 'react'
import axios from 'axios';
import useTheme, { ThemeProvider } from './app/store';


function Quiz({category, setActive}) {
    const [quizData, setQuizData] = useState([]);
    const [questionNo, setQuestionNo] = useState(0);
    const [optionSelected, setOptionSelected] = useState();
    const [isCorrect, setIscorrect] = useState(true);
    const [marks, setMarks] = useState(0);
    const [progress, setProgress] = useState('w-2/12');
   

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
      
      // console.log(selectedOption == correctOption);
      if(selectedOption === correctOption){
        setIscorrect(true);
        
        setTimeout(()=>{
          setQuestionNo((prev) => prev+1);
          setMarks((prev) => prev + 1);
          setProgress((prev)=>{
            let currentProgress = (prev.split('/'));
            let splittedWidth = parseInt((currentProgress[0].split('-'))[1]);
            return `w-${splittedWidth+1}/12`;
          })
        }, 500);
      }else{
        setIscorrect(false);
      }
      setOptionSelected(null);
    }

  return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 h-screen text-white ${textMode} ${themeMode} gap-0`}>
      {questionNo < 10 ? (
          <div className={`flex content-center flex-col items-center justify-center font-sansserif ${textMode}`}>
               {isCorrect ? (
                <>
                <p className='italic text-start mt-6'>Question {questionNo+1} of {quizData?.length}</p><br />
              <h2 className='text-xl md:text-4xl font-normal text-center'>{quizData[questionNo]?.question}</h2>
              <br />
              <div className=' progress-container h-3 bg-white w-80 md:w-96 rounded-xl md:mt-10'>
                <div className={`progress bg-purple-700 h-full ${progress} rounded-xl`}></div>
               </div>
                </>
               ): 
               <>
               {/* <h2 className='text-4xl font-normal text-center'>You have Scored {marks} out of {quizData.length}.</h2><br /> */}
               <h2 className='text-3xl md:text-4xl font-normal text-center text-red-900 mt-5'>Please select a correct option</h2><br />
                <h2 className='text-xl md:text-4xl font-normal text-center'>{quizData[questionNo]?.question}</h2>

               {/* <div className=' progress-container h-4 bg-white w-80 rounded-xl'>
                <div className={`progress bg-purple-700 h-full ${progress} rounded-xl mt-5`}></div>
               </div> */}

               </>
               
               } 
        </div>): 
        <div className="flex content-center flex-col items-center justify-center font-sansserif">
               <h2 className='text-4xl font-normal text-center'>You have Scored {marks} out of {quizData.length}.</h2><br />    
        </div>
        }
        
        <div className='flex justify-center flex-col items-center font-serif text-xl'>
          
          {quizData[questionNo]?.options.map((optionVal, index)=>{
            return(<div className={`flex justify-center items-center h-12 w-72 md:w-80 lg:w-80 xl:w-80 2xl:w-80  rounded-xl mb-4 cursor-pointer border-2 border-solid ${(index === optionSelected && optionSelected !== null) && isCorrect  ? 'bg-green-500' : ``} ${borderColor} ${textMode} ${optionSelected === index ? "bg-yellow-300 text-blue-800" : `${themeMode}`}`} key={index} onClick={()=>handleAnswer(index)}>
            <p className={`text-base lg:text-lg xl:text-xl 2xl:text-xl text-center`} key={optionVal}>{optionVal}</p>
          </div>
          )})}
          {(questionNo < 10) ? (
          <div className="flex justify-center items-center h-12 w-72 md:w-80 lg:w-80 xl:w-80 2xl:w-80 bg-purple-700 text-white rounded-xl mb-4 cursor-pointer">
            <input type="button" className='text-2xl cursor-pointer' value="Submit answer"  onClick={handleSubmit}/>
          </div>) : 
            <input type="button" className='text-2xl cursor-pointer' value="Return to Home"  onClick={()=>{setActive(false)}}/>
           } 
        </div>
      </div>
   
    
  )
}

export default Quiz