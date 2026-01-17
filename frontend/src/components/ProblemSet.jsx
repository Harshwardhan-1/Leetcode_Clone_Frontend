import {useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function ProblemSet(){
    const navigate=useNavigate();
    const [data,setData]=useState(null);
    const [problem,showProblem]=useState([]);
    const [specific,setSpecific]=useState(null);
    useEffect(()=>{
        const fetch=async()=>{
            try{
const response=await axios.get('https://leetcode-clone-backend-1.onrender.com/api/all/particularUser',{withCredentials:true});
if(response.data.message=== 'find user'){
    setData(response.data.data);
}
            }catch(err){
                if(err.response?.data?.message=== 'student not found'){
                    alert('student not found');
                }else if(err.response?.data?.message=== 'not found'){
                    alert('not found');
                }
            }
        };
        fetch();
    },[]);


    const handleProblems=async(e)=>{
        e.preventDefault();
        try{
const response=await axios.get('https://leetcode-clone-backend-1.onrender.com/api/question/showQuestion',{withCredentials:true});
showProblem(response.data.data);
        }catch(err){
            console.log(err);
        }
    }
    const handleParticular=async(id)=>{
        const send={id};
        try{
            const response=await axios.post('https://leetcode-clone-backend-1.onrender.com/api/question/particularQuestion',send,{withCredentials:true});
            if(response.data.message=== 'got particular problem'){
                const problemData=response.data.data;
                setSpecific(problemData);
                navigate('/ParticularProblem',{state:{problem:problemData}});
            }
        }catch(err){
            if(err.response?.data?.message=== 'provide proper detail'){
                alert('provide proper detail');
            }else if(err.response?.data?.message=== 'not get'){
                alert('not got problem');
            }
        }
    }
    return(
        <>
        <div>
            <h1>Problem Set</h1>
            <p>Name:{data?.name}</p>
            <p>Gmail:{data?.gmail}</p>
            <button onClick={handleProblems}>See All Problems</button>
        </div>

        {
            problem.map((all,index)=>(
                <div key={index}>
                    <button onClick={()=>handleParticular(all._id)}>{all?.title}</button>
                </div>
            ))
        }

       <p>{specific?.title}</p>
       <p>{specific?.description}</p>
        </>
    );
}