import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./ParticularProblem.css";
export default function ParticularProblem() {
  const location = useLocation();
  const harsh = location.state?.problem;
  const [language, setLanguage] = useState("");
  const [userCode, setUserCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleRun = async (id, title) => {
    if (!language || !userCode) {
      alert("Select language and write code");
      return;
    }
    const send = {id,title,language,userCode};
    try {
      setLoading(true);
      const response = await axios.post("https://leetcode-clone-backend-1.onrender.com/api/run/runUserCode",send,{ withCredentials: true });
      setResult(response.data);
    } catch (err) {
      console.log(err);
      alert("Error running code");
    } finally {
      setLoading(false);
    }
  };






  const handleSubmit=async(id,title,description,userCode)=>{
    const send={id,title,description,userCode};
    if(result?.message === 'all test case passed'){
      try{
    const response=await axios.post('https://leetcode-clone-backend-1.onrender.com/api/submit/submitCode',send,{withCredentials:true});
    if(response.data.message=== 'successfully submitted'){
      alert('successfully submitted');
    }
      }catch(err){
        if(err.response?.data?.message=== 'provide proper detail'){
          alert('provide proper detail');
        }else if(err.response?.data?.message=== 'you already submitted the code 3 times try some other question'){
          alert('you already submitted code 3 times try some other question bro');
   }
      }
    }else{
      alert('please pass all the test cases after that you will only able to submit');
    }
  }

  return (
    <div className="pp-main-container">
      <div className="pp-left">
        <p><b>Question Id:</b> {harsh?._id}</p>
        <p><b>Title:</b> {harsh?.title}</p>
        <p><b>Description:</b> {harsh?.description}</p>
        <p><b>Constraint:</b> {harsh?.constraint}</p>
        <p><b>Difficulty:</b> {harsh?.difficulty}</p>
        <p><b>Topic:</b> {harsh?.topic}</p>
        <select
          className="pp-language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">Select Language</option>
          <option value="C++">C++</option>
          <option value="Java">Java</option>
          <option value="Python">Python</option>
        </select>
      </div>
      <div className="pp-right">
        <h2>Write your code — {harsh?.title}</h2>
        <textarea
          className="pp-code-editor"
          placeholder="Write your code here..."
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
        />

        <div className="pp-buttons">
          <button onClick={() => handleRun(harsh?._id, harsh?.title)} className="pp-run-btn" >
            {loading ? "Running..." : "Run Code"}
          </button>
          <button onClick={()=>handleSubmit(harsh?._id, harsh?.title,harsh?.description,userCode)} className="pp-submit-btn">Submit </button>
        </div>
        {result && (
          <div className="pp-output-box">
            <h3>Result:<span style={{ color:result.message === "all test case passed"? "green": "red",marginLeft: "10px"}}>
                {result.message}
              </span>
            </h3>
            {result.data.map((tc, index) => (
              <div
                key={index}
                className={`pp-testcase ${tc.status === "Passed"? "pass": "fail"}`}>
                <h4>Test Case {index + 1}</h4>
                <p><b>Input:</b></p>
                <pre>{tc.input}</pre>
                <p><b>Expected Output:</b></p>
                <pre>{tc.expectedOutput}</pre>
                <p><b>Your Output:</b></p>
                <pre>{tc.userOutput}</pre>
                <p> <b>Status:</b>{" "}<span style={{color: tc.status === "Passed" ? "green" : "red"}}>{tc.status}</span></p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}