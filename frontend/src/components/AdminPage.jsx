import {useState} from 'react';
import './AdminPage.css';
import axios from 'axios';
export default function AdminPage(){
    const [title,setTitle]=useState('');
    const [description,setDescription]=useState('');
    const [functionSignature,setFunctionSignature]=useState('');
    const [constraint,setConstraint]=useState('');
    const [sampleInput,setSampleInput]=useState('');
    const [sampleOutput,setSampleOutput]=useState('');
    const [difficulty,setDifficulty]=useState('');
    const [topic,setTopic]=useState('');


    const handle=async(e)=>{
e.preventDefault();
const send={title,description,functionSignature,constraint,sampleInput,sampleOutput,difficulty,topic};
try{
    const response=await axios.post('https://leetcode-clone-backend-1.onrender.com/api/question/addQuestion',send,{withCredentials:true});
    if(response.data.message=== 'question created successfully'){
        alert('question created successfull');
    }
}catch(err){
    if(err.response?.data?.message=== 'fill details properly'){
        alert('provide proper detail');
    }else if(err.response?.data?.message=== 'already have same question'){
        alert('already have same question');
    }
}
    }
  

    return(
        <>
        <div className="admin-page">
        <h1 >This Is Admin Page Harsh</h1>
        <h1 className="admin-title">Admin-ADD QUESTION PAGE</h1>
        <form className="admin-form" action="">
<input type="text" placeholder='Enter question title here' value={title} onChange={(e)=>setTitle(e.target.value)} />
<textarea  placeholder='Enter description here' value={description} onChange={(e)=>setDescription(e.target.value)}/>
<input type="text" placeholder='Enter functionSignature here' value={functionSignature} onChange={(e)=>setFunctionSignature(e.target.value)} />
<textarea placeholder='Enter Constraints' value={constraint} onChange={(e)=>setConstraint(e.target.value)}/>
 <textarea placeholder="Sample Input" value={sampleInput}onChange={(e) => setSampleInput(e.target.value)}/>
<textarea placeholder="Sample Output" value={sampleOutput}onChange={(e) => setSampleOutput(e.target.value)}/>
    <select value={difficulty} onChange={(e)=>setDifficulty(e.target.value)}>
    <option value="Easy">Easy</option>
    <option value="Medieum">Medium</option>
    <option value="Hard">Hard</option>
</select>
<input type="text" placeholder='Enter topic here Ex(Array,HashMap)' value={topic}  onChange={(e)=>setTopic(e.target.value)}/>
       <button onClick={handle} type='submit'>Add Question</button>
        </form>
        </div>
        </>
    );
}