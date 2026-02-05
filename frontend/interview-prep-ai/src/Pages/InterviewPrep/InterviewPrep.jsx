import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { LuCircleAlert ,LuListCollapse } from 'react-icons/lu';
import SpinnerLoader from '../../components/loader/SpinnerLoader';
import { toast } from 'react-hot-toast';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import RoleInfoHeader from "../InterviewPrep/components/RoleInfoHeader"
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const InterviewPrep = () => {
  

const { sessionId } = useParams();


  const [sessionData , setSessionData] = useState(null);
  const[errMsg , setErrMsg] = useState("");

  const [openLearnMoreDrawer  ,setOpenLearnMoreDrawer] = useState(false);
  const[explanation  , setExplanation] = useState(null);

  const[isLoading , setIsloading] = useState(false);
  const[isUpdateLoader , setIsUpdateLoader ] = useState(false);

const fetchSessionDetailsById = async ()=>{ 
    try{
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));

      if(response.data && response.data.session){
        setSessionData(response.data.session)
      }
    }catch(error){
      console.log("error" , error)
    }
 }

const generateConceptExplanation = async () => {

}

const toggleQuestionPinStatus = async () =>{

}

const uploadMoreQuestions = async () => {

}

useEffect(()=>{
  if(sessionId){
    fetchSessionDetailsById();
  }

  return () =>{ }
},[])

console.log(sessionId)


  return (
    <DashboardLayout   >
      <RoleInfoHeader 
      
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || "-"}
        questions={sessionData?.questions?.length || "-"}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt ? moment(sessionData.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />

      

      
    </DashboardLayout>
  )
}

export default InterviewPrep