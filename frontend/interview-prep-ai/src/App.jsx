import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import LandingPage from "./Pages/LandingPage";
import Dashboard from "./Pages/Home/Dashboard"; 
import InterviewPrep from "./Pages/InterviewPrep/InterviewPrep";

import UserProvider from './context/UserContext';  

const App = () => {
  return (
    <UserProvider>  {/* Fixed: Use Provider component, not lowercase */}
      <div className=''>
        <Router>
          <Routes>
            {/* Default Route */}
            <Route path='/' element={<LandingPage />} />

            <Route path='/login' element={<Login />} />
            <Route path='/signUp' element={<SignUp />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/interview-prep/:sessionId' element={<InterviewPrep />} />
          </Routes>
        </Router>

        <Toaster  
          toastOptions={{  // Fixed: Remove extra assignment, use object directly [web:1]
            className: "",
            style: {
              fontSize: "13px",
            }
          }}
        />
      </div>
    </UserProvider>
  );
};

export default App;
