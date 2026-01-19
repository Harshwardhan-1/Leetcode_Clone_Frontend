import { useState } from "react";
import {useEffect} from 'react';
import axios from "axios";
import './AllPointsEarned.css';
export default function AllPointsEarned(){
    const [data,setData]=useState([]);
    const [totalPoints,setTotalPoints]=useState(0);

    useEffect(()=>{
        const fetch=async()=>{
            try{
    const response=await axios.get('http://localhost:3000/api/submit/seeSubmission',{withCredentials:true});
    if(response.data.message=== 'here are your submission'){
        setData(response.data.data);
        const sum=response.data.data.reduce((acc, curr)=>acc+(curr?.points),0);
        setTotalPoints(sum);
    }
            }catch(err){
                if(err.response?.data?.message=== 'no submission yet'){
                    alert('no points yet');
                }
            }
        };
        fetch();
    },[]);
    return(
        <>
        <div className="points-container">
        <h1>This are the points that you have Earned</h1>
        <h2>Total Points:{totalPoints}</h2>
        <div className="points-list">
        {
            data.map((all,index)=>(
                <div  className="points-card" key={index}>
            <p><strong>Question:</strong> {all?.title}</p>
            <p><strong>Points Earned:</strong> {all?.points}</p>
                </div>
            ))
        }
        </div>
        </div>
        </>
    );
}