import React, { useContext, useState } from 'react';  
import { useNavigate } from "react-router-dom";
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext'; 

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);  

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      });

      const { token, user } = response.data;  // Fixed: destructure properly
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user || response.data);  // Pass user data, not full response
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className='w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center'> {/* Fixed: 33wv → 35vw */}
      <h3 className='text-lg font-semibold text-black'>
        Welcome Back
      </h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Please enter your details to log in
      </p>

      <form onSubmit={handleLogin}>
        <Input
          type="text"  
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label='Email Address'
          placeholder='akash@gmail.com'
        />

        <Input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label='Password'  
          placeholder='Minimum 8 characters'
        />

        {error && (
          <p className='text-red-500 text-xs pb-2.5 mt-2'> {/* Added margin */}
            {error}
          </p>
        )}

        <button type='submit' className='btn-primary w-full mt-4'> {/* Added full width */}
          LOGIN
        </button>

        <p className='text-[13px] text-slate-800 mt-3 text-center'>
          Don't have an account?{' '}
          <button 
            type="button"  
            className='font-medium text-primary underline cursor-pointer' 
            onClick={() => setCurrentPage("signup")}
          >
            Sign Up  {/* Fixed spacing */}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
