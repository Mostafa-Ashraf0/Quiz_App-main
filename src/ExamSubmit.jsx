import { useEffect } from "react";
import Question from "./Question";
import QuestionForm from "./QuestionForm";
import QuestionUpdateForm from "./QuestionUpdateForm";
import { useAuth } from "./context/AuthContext"
import { addDoc, collection, getDocs } from "firebase/firestore"; 
import {db} from "./firebase";
import Form from 'react-bootstrap/Form';
import QuestionSubmit from "./QuestionSubmit";
import { useParams, useNavigate } from "react-router-dom";
import FinalResult from "./FinalResult";


const ExamSubmit = ()=>{
        const {question,addQuestion,submition,setSubmition,setGrade,loading,setLoading} = useAuth();
        const { examId } = useParams();
        const navigate = useNavigate();

        useEffect(() => {
          if (!examId) return;
          addQuestion([]);//make sure not to add questions from another exam
          const fectchQuestion = async()=>{
            const qRef = collection(db, `exam/${examId}/questions`);
            const snapshot = await getDocs(qRef);
            const qData = snapshot.docs.map(doc=>({ id: doc.id, ...doc.data() }))
            addQuestion(qData); 
            setLoading(false)
          };
          fectchQuestion();
        }, [examId]);

        // correction logic
        const handleSubmit = async(e)=>{
          e.preventDefault();
          // check if all questions answered
          if(question.length !== submition.q.length){
            alert("please answer all questions");
            console.log(submition);
            return;
          }
          let finalGrade = 0;
          submition.q.forEach(a=>{
            const originalQ = question.find(q=>(q.id === a.qId));
            if(a.answer === originalQ.Answer){
              finalGrade++;
            }
        });
        setGrade(finalGrade);
        const newSubmition = {...submition,grade:finalGrade}
        const submitRef = collection(db, `exam/${examId}/submitions`);
        await addDoc(submitRef, newSubmition);
        console.log(newSubmition);
        setSubmition({name:"", q:[]});
        navigate("/finalResult");
        }


      if(loading){
        return <h2>loading...</h2>
      }else{
        return(
          <form onSubmit={handleSubmit} className="p-4">
            {question && question.map((q,index)=>{
                return <QuestionSubmit key={q.id} id={q.id} data={q} index={index}/>
            })}
            <button type="Submit" className="btn btn-primary">Submit</button>
          </form>
        )
      }
};

export default ExamSubmit;