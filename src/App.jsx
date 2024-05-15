import { useState } from 'react'
import Quiz from './Quiz';
import Landing from './Components/Landing';
import Navbar from './Components/Navbar';
import { ThemeProvider } from './app/store';



function App() {
  const [themeMode, setThemeMode] =  useState("white");
  const [textMode, setTextMode] = useState("text-slate-800");
  const [borderColor, setBorderColor] = useState("border-slate-800")

const ToogleTheme = () => {
  setThemeMode((prev) => prev === "bg-slate-800"? "bg-white" : "bg-slate-800");
  setTextMode((prev) => prev === "text-slate-800"? "text-white" : "text-slate-800");
  setBorderColor((prev) => prev === "border-slate-800" ? "border-gray-400" : "border-slate-800")
}

  return (
    <>
    <ThemeProvider value={{themeMode, textMode, borderColor, ToogleTheme}}>
      <Navbar/>
      <Landing/>
    </ThemeProvider>
      
    </>
    
  )
}

export default App
