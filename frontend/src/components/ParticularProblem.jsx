import {useState} from 'react';
import { useLocation } from "react-router-dom";
import './ParticularProblem.css';
import axios from 'axios';
export default function ParticularProbem(){
    const [userCode,setUserCode]=useState('');
    const [language,setLanguage]=useState('');
    const [result,setResult]=useState(null);
    const location=useLocation();
    const harsh=location.state?.problem;
    const handleRunButton=async(id)=>{
        const send={id,language,userCode};
        try{
const response=await axios.post('https://leetcode-clone-backend-1.onrender.com/api/runCode/CheckRunCode',send,{withCredentials:true});
console.log(response);
setResult(response.data);
        }catch(err){
            console.log(err);
        }
    }

    const handleSubmit=async(title,description,difficulty,topic)=>{
        const send={title,description,difficulty,topic};
    try{
        const response=await axios.post('https://leetcode-clone-backend-1.onrender.com/api/submit/submitSol',send,{withCredentials:true});
        if(response.data.message=== 'successfully submitted'){
            alert('successfully submit');
        } 
    }catch(err){
        if(err.response?.data?.message=== 'provide proper detail'){
            alert('provide proper detail');
        }
    }
    }

    return(
        <>
        <div className="pp-main-container">
         <div className="pp-left">
        <h1>Problem:{harsh.title}</h1>
        <p>Title : {harsh.title}</p>
        <p>Description:{harsh.description}</p>
        <p>Constraints:{harsh.constraint}</p>
        <p>Difficulty:{harsh.difficulty}</p>
        <p>Topic:{harsh.topic}</p>

        <div  className="pp-language-select">
        <select value={language} onChange={(e)=>setLanguage(e.target.value)}>
            <option value="Choose Language">Choose Language</option>
            <option value="C++">C++</option>
            <option value="Java">JAVA</option>
            <option value="Python">Python</option>
            <option value="Javascript">Javascript</option>
        </select>
        </div>
        </div>
       <div className="pp-right">
        <h1>Write Your Code Here For Problem: {harsh?.title}</h1>
        <textarea className="pp-code-editor" placeholder='Write Your Code Here' onChange={(e)=>setUserCode(e.target.value)}/>
           <div className="pp-buttons">

<button onClick={()=>handleRunButton(harsh._id)} className="pp-run-btn">Run Code</button>
<button onClick={()=>handleSubmit(harsh?.title,harsh?.description,harsh?.difficulty,harsh?.topic)} className="pp-submit-btn">Submit</button>
        </div>
        <div className="pp-sample">
          <p><strong>Sample Input:</strong> {JSON.stringify(harsh?.sampleInput)}</p>
          <p><strong>Sample Output:</strong> {JSON.stringify(harsh?.sampleOutput)}</p>
        </div>
        </div>
        </div>


        {result &&(
  <div className="pp-result">
    <h3>
      Status:
      {result.status==="Accepted"?" Accepted":"Wrong Answer"}
    </h3>

    <p><b>Your Output:</b> {result.yourOutput}</p>
    <p><b>Expected Output:</b> {result.sampleOutput}</p>
  </div>
)}
        </>
    );
}