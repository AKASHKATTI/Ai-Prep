import React from 'react'

import { BrowserRouter as Router ,Routes , Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";

import LandingPage from "./Pages/LandingPage";
import Dashbaord from "./Pages/Home/Dashboard";
import InterviewPrep from "./Pages/InterviewPrep/InterviewPrep"

const App = () => {
  return (
    <div className=''>
      <Router>
        <Routes>
          {/* {default Route} */}
          <Route path='/' element = {<LandingPage/>} />

          <Route path='/login' element = {<Login/>} />
          <Route path='/signUp' element = {<SignUp/>} />
          <Route path='/dashboard' element = {<Dashbaord/>} />
          <Route path='/interview-prep/:sessionId' element = {<InterviewPrep/>} />

        </Routes>
      </Router>

      <Toaster  
      toastOptions = {
        {
          className :"",
          style : {
            fontSize : "13px",
          }
        }
      }
      />
    </div>
  )
}

export default App