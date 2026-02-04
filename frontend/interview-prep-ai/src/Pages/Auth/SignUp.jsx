import React, { useState , useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector ';
import { UserContext } from '../../context/UserContext';
import { FaUpload } from 'react-icons/fa';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { validateEmail } from '../../utils/helper';

const SignUp = ( {setCurrentPage } ) => {
    const[fullName , setFullName] = useState("")
    const [email , setEmail ] = useState("");
    const[password , setPassword] = useState("");
    const [profilePic,setProfilePic]=useState(null);
    const[error , setError] = useState(null);

    const { updateUser } = useContext(UserContext); 

    const navigate = useNavigate();

    const handleSignUp = async (e)=>{
      e.preventDefault();

      let profileImageUrl = " ";

      if(!fullName){
        setError("Enter your Name.");
        return;
      }

      if(!validateEmail(email)){
              setError("Please enter a valid email address");
              return;
      }
      
      if(!password){
            setError("Please enter the password");
            return;
      }
      
          setError("");
      
          // signUp API call
          try{

            if(profilePic){
              const imageUploadRes = await uploadImage(profilePic);
              profileImageUrl = imageUploadRes.imageUrl || " "
            }

            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER , {
              name : fullName,
              email,
              password,
              profileImageUrl
            })

            const { token } = response.data;

            if(token){
              localStorage.setItem("token" , token);
              updateUser(response.data);
              navigate("/dashboard")
            }

            
      
          }
          catch(error){
            if(error.response && error.response.data.message){
              setError(error.response.data.message);
            }else{
              setError("Something went wrong. Please try again.")
            }
          }
    }

  return (
    <div className='w-[90vw] md:w-[33wv] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black '>
        Create an Account
      </h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>
        Join us today by enter your detail below
      </p>

      <form onSubmit={handleSignUp}>

        <ProfilePhotoSelector  image={profilePic} setImage = {setProfilePic} />

        <Input
         type="text"
         value={fullName}
         onChange={({ target}) => setFullName(target.value)}
         label = 'Enter your full name'
         placeholder='Katti Akash'
         />

        <Input
         type="text"
         value={email}
         onChange={({ target}) => setEmail(target.value)}
         label = 'Email Address'
         placeholder='Akash@gmail.com'
         />

         <Input
         type="password"
         value={password}
         onChange={({ target}) => setPassword(target.value)}
         label = 'password'
         placeholder='min 8 characters'
         />
         {error && <p className='text-red-500 text-xs pb-2.5'>  {error}</p>}

        <button type='submit' className='btn-primary'>
            Register
        </button>

        <p className='text-[13px] text-slate-800 mt-3'>
          Have an account ? {" "}
          <button className='font-medium text-primary underline cursor-pointer' 
          onClick={ () => {
            setCurrentPage("login")
          }}>Log In

          </button>
        </p>

      </form>


    </div>
  )
}

export default SignUp