import { useEffect } from "react"
import Question from "./Question"
import QuestionForm from "./QuestionForm";
import QuestionUpdateForm from "./QuestionUpdateForm";
import { useAuth } from "./context/AuthContext"
import { collection, getDocs } from "firebase/firestore"; 
import {db} from "./firebase";
import Form from 'react-bootstrap/Form';
import QuestionSubmit from "./QuestionSubmit";
import { useParams } from "react-router-dom";


const ExamSubmit = ()=>{
        const {question,addQuestion} = useAuth();
        const { examId } = useParams();
        useEffect(() => {
          if (!examId) return;
          addQuestion([]);//make sure not to add questions from another exam
          const fectchQuestion = async()=>{
            const qRef = collection(db, `exam/${examId}/questions`);
            const snapshot = await getDocs(qRef);
            const qData = snapshot.docs.map(doc=>({ id: doc.id, ...doc.data() }))
            addQuestion(qData); 
            console.log(qData);
          };
          fectchQuestion();
        }, [examId]);
    
    return(
        <form>
            {question && question.map((q,index)=>{
                return <QuestionSubmit key={q.id} id={q.id} data={q} index={index}/>
            })}
            <button type="Submit" className="btn btn-primary">Submit</button>
        </form>
    )
};

export default ExamSubmit;