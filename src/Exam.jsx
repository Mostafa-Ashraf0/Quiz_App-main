import { useState,useEffect } from 'react'
import Question from './Question'
import { Link } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { signOut } from 'firebase/auth'
import {auth} from './firebase'
const DummyData = [{
    id: 1,
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
    grade: "2"
}, {
    id: 2,
    question: "What is 2 + 2?", 
    options: ["3", "4", "5", "6"],
    answer: "4",
    grade: "1"
}, {
    id: 3,
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Jupiter",
    grade: "3"
}
]





export default function Exam(){
    const [questionIndex, setQuestionIndex] = useState(0);
    const [grade, setGrade] = useState(0);
    const {user} = useAuth();
    function handleChange(e){
        if(e.target.value === DummyData[questionIndex].answer){
            alert("rigth answer");
            setGrade(grade+ parseInt(DummyData[questionIndex].grade))
        }else{
            alert("wrong answer");
        }
    }
    function handleNextClick(){
        if(questionIndex < DummyData.length-1){
            setQuestionIndex(questionIndex + 1);
        }
    }
    function handlePrevClick(){
        if(questionIndex > 0){
            setQuestionIndex(questionIndex - 1);
        }
    }
    async function handelLogout(){
        try {
            await signOut(auth);
            alert("signed out successfuly")
        }catch (err){
            console.log(err);
            alert(err);
        }
    }
    useEffect(()=>{
        console.log(grade)
    },[grade])
    return (
        <>
            {user?(
                <Link to="/Signin">
                <button onClick={handelLogout}>
                Log out</button>
            </Link>
            ):
            (
            <Link to="/Signin">
                <button>
                Log in</button>
            </Link>
            )
            }
            {user?(
                <h2 style={{color:"green"}}><span style={{color:"black"}}>hello</span> {user.email}</h2>
            ):
            (
                <h2>hello Guest</h2>
            )
            }
            <h2>Question {DummyData[questionIndex].id}</h2>
            <p style={{fontSize:"25px"}}>{DummyData[questionIndex].question}</p>
            <select style={{width:"200px",fontSize:"20px",marginBottom:"20px"}} name="choose" id="choose" onChange={handleChange}>
                <option value="#" selected>select answer</option>
                {DummyData[questionIndex].options.map((option,index)=><option key={index} value={option} >{option}</option>)}
            </select>
            <div className="buttons" style={{width:"700px",fontSize:"15px",display:"flex", justifyContent:"space-between"}}>
                <button onClick={handlePrevClick}>previus</button>
                <button onClick={handleNextClick}>next</button>
            </div>
        </>
)}