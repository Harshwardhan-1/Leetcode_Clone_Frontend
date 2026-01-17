import {useState,useEffect } from "react";
import axios from "axios";
import './AllQuestions.css';
export default function AllQuestions(){
    const [data,setData]=useState([]);
    useEffect(()=>{
        const fetch=async()=>{
            try{
                const response=await axios.get('https://leetcode-clone-backend-1.onrender.com/api/question/allQuestion',{withCredentials:true});
                setData(response.data.data);
            }catch(err){
                console.log(err);
            }
        };
        fetch();
    },[]);
    return(
        <>
          <div className="all-questions-page">
        <h1>All Questions list</h1>
        <div className="questions-list">
        {
            data.map((all,index)=>(
                <div className="question-card" key={index}>
                    <p>Question id:{all?._id}</p>
                    <p>Title:{all?.title}</p>
                    <p>Description:{all?.description}</p>
                    <p>Code:{all?.functionSignature}</p>
                    <p>Sample Input:{JSON.stringify(all?.sampleInput)}</p>
                    <p>Sample Output:{JSON.stringify(all?.sampleOutput)}</p>
                    <p>Contraints:{all?.constraint}</p>
                    <p>Difficulty:{all?.difficulty}</p>
                    <p>Topic:{all?.topic}</p>
                </div>
            ))
        }
        </div>
        </div>
        </>
    );
}