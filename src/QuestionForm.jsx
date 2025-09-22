import { useRef } from "react";
import { useAuth } from "./context/AuthContext"
export default function QuestionForm(){
    const {question, addQuestion} = useAuth();
    const questionText = useRef();
    const optionA = useRef();
    const optionB = useRef();
    const optionC = useRef();
    const optionD = useRef();
    const answer = useRef();
    const handleSubmit = (e)=>{
        e.preventDefault();
        const newQuestion = {
            "questionText":questionText.current.value,
            "A":optionA.current.value,
            "B":optionB.current.value,
            "C":optionC.current.value,
            "D":optionD.current.value,
            "Answer":answer
        }
        addQuestion([...question,newQuestion]);
        questionText.current.value = "";
        optionA.current.value = "";
        optionB.current.value = "";
        optionC.current.value = "";
        optionD.current.value = "";
        answer.current.value = "";
    }
    return(
        <>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter question" ref={questionText} required/>
                <div className="option">
                    <label htmlFor="a">A:</label>
                    <input type="text" ref={optionA} required/>
                </div>
                <div className="option">
                    <label htmlFor="a">B:</label>
                    <input type="text" ref={optionB} required/>
                </div>
                <div className="option">
                    <label htmlFor="a">C:</label>
                    <input type="text" ref={optionC} required/>
                </div>
                <div className="option">
                    <label htmlFor="a">D:</label>
                    <input type="text" ref={optionD} required/>
                </div>
                <div className="Answer">
                    <label htmlFor="answer">Answer</label>
                    <input type="text" ref={answer} required/>
                </div>
                <button type="submit">Add</button>
            </form>
        </>
    )
}