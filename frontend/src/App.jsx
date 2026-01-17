import {Routes,Route} from 'react-router-dom';
import SignUpPage from "./components/SignUpPage"
import SignInPage from './components/SignInPage';
import HomePage from './components/HomePage';
import ForgotPassword from './components/ForgotPassword';
import OtpVerify from './components/OtpVerify';
import NewPassword from './components/NewPassword';
import AdminPage from './components/AdminPage';
import AllQuestions from './components/AllQuestions';
import ProblemSet from './components/ProblemSet';
import {useState} from 'react';
import {useEffect} from 'react';
import axios from 'axios';
function App() {
  useEffect(()=>{
    const UpBackend=async()=>{
      try{
        const response=await axios.get('https://leetcode-clone-backend-1.onrender.com',{withCredentials:true});
        console.log(response.data);
      }catch(err){
        if(err.response){
          alert(err.response.data.message || "Invalid email or passowrd");
        }else{
          alert('Server went down');
        }
      }
    }
    UpBackend();
  },[]);
  const [userData,setUserData]=useState(null);
  const [passwordData,setPasswordData]=useState(null);   
  return (
    <>
    <Routes>
      <Route path='/' element={<SignUpPage />}></Route>
      <Route path='/signIn' element={<SignInPage setUserData={setUserData} />}></Route>
      <Route path='/HomePage' element={<HomePage userData={userData}/>}></Route>
      <Route path='/ForgotPassword' element={<ForgotPassword setPasswordData={setPasswordData}/>}></Route>
      <Route path='/OtpVerify' element={<OtpVerify passwordData={passwordData} /> }></Route>
      <Route path='/NewPassword' element={<NewPassword />}></Route>
      <Route path='/AdminPage' element={<AdminPage />}></Route>
      <Route path='/AllQuestions' element={<AllQuestions />}></Route>
      <Route path='/ProblemSet' element={<ProblemSet />}></Route>
    </Routes>
    </>
  )
}

export default App
