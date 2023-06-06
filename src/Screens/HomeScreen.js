import React from 'react';
import { useSelector } from "react-redux";
import GetPatientForm from '../Components/GetPatientForm';
import GetCriminalForm from '../Components/GetCriminalForm';


const HomeScreen = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo }= userSignin;
  return (<>
    {userInfo.data && userInfo.data.includes("ADMIN_USER")?<><GetPatientForm/><GetCriminalForm/></>:userInfo.data.includes("RESCUE_USER")?
         <GetPatientForm/>: <GetCriminalForm/>}
</>
  )
}

export default HomeScreen;