import { useState,useEffect } from "react";
import axios from "axios";
import './AllSubmission.css';
export default function AllSubmission(){
    const [data,setData]=useState([]);

    useEffect(()=>{
        const fetch=async()=>{
            try{
const response=await axios.get('https://leetcode-clone-backend-1.onrender.com/api/submit/seeSubmission',{withCredentials:true});
if(response.data.message=== 'here are your submission'){
    setData(response.data.data);
}
            }catch(err){
                if(err.response?.data?.message=== 'no submission yet'){
                    alert('no submission yet');
                }
            }
        };
        fetch();
    },[]);
    return(
        <>
            <div className="all-submission-container">
        <h1>This Are The List Of Submission Of Yours</h1>
         <div className="all-submission-list">
        {
            data.map((all,index)=>(
                <div className="all-submission-card" key={index}>
                    <p>Title:     {all?.title}</p>
                    <p>Code:      {all?.userCode}</p>
                </div>
            ))
        }
        </div>
        </div>
        </>  
    );
}