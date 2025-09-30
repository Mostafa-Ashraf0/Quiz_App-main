import { useEffect } from "react"
import Question from "./Question"
import QuestionForm from "./QuestionForm";
import { useAuth } from "./context/AuthContext"
import { collection,getDocs } from "firebase/firestore"; 
import {db} from "./firebase"
import Form from 'react-bootstrap/Form';

export default function Exam(){
    const {question,setExamId,examId,addQuestion} = useAuth();

    useEffect(()=>{
        setExamId(localStorage.getItem("examId"));
    },[])
    useEffect(() => {
    if (!examId) return;

    async function fetchQuestions() {
      try {
        const qRef = collection(db, "exam", examId, "questions");
        const snapshot = await getDocs(qRef);
        const qData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        addQuestion(qData);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    }

    fetchQuestions();
  }, [examId]);
    return(
        <div className="p-3">
            <input type="text" className="w-75 mb-1" placeholder="Exam Title" defaultValue="Default Title"/>
            <QuestionForm/>
            {question && question.map((q, index) => {
            return <Question key={index} index={index} data={q} />
            })}
        </div>
    )
}