import { useState } from "react"
import Question from "./Question"
import QuestionForm from "./QuestionForm";
import { useAuth } from "./context/AuthContext"

export default function Exam(){
    const {question} = useAuth();
    const [showFrom, setShowForm] = useState(false);
    const handleClick = ()=>{
        setShowForm(true);
    }

    return(
        <>
            <button onClick={handleClick}>newQuestion</button>
            {showFrom && <QuestionForm/>}
            {question && question.map((q, index) => {
            return <Question key={index} index={index} data={q} />
            })}
        </>
    )
}