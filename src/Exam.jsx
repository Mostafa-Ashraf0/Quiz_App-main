import { useEffect, useState } from "react"
import Question from "./Question"
import QuestionForm from "./QuestionForm";
import QuestionUpdateForm from "./QuestionUpdateForm";
import { useAuth } from "./context/AuthContext"
import { collection, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore"; 
import {db} from "./firebase";
import Form from 'react-bootstrap/Form';
import './assets/exam.css';

export default function Exam(){
    const {question,setExamId,examId,addQuestion,user,updateFormView} = useAuth();
    const [title, setTitle] = useState("Untitled Exam");
    useEffect(()=>{
        setExamId(localStorage.getItem("examId"));
    },[])
    useEffect(() => {
      if (!examId) return;
      addQuestion([]);//make sure not to add questions from another exam
      const qRef = collection(db, `exam/${examId}/questions`);
      const unsubscribe = onSnapshot(qRef, (snapshot) => {
        const qData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        addQuestion(qData);
      }, (error) => {
        console.error("Error fetching questions:", error);
      });

      return () => unsubscribe();

    }, [examId]);

    useEffect(()=>{
      const fetchTitle = async()=>{
        try{
        const examRef = doc(db,`users/${user.uid}/exams/${examId}`);
        const examSnap = await getDoc(examRef);
        const data = examSnap.data();
        setTitle(data.title)
      }catch(err){
        alert(err)
      }
      }
      if (user?.uid && examId){
        fetchTitle();
      }
    },[examId,user.uid])

    const handleChange = async(e)=>{
      try{
        const newTitle = e.target.value;
        const examRef = doc(db,`users/${user.uid}/exams/${examId}`);
        setTitle(newTitle);
        await updateDoc(examRef,{title:newTitle});
      }catch(err){
        alert(err);
      }
    }

    return(
        <div className="exam-body">
            {updateFormView && 
            <div className="update-form">
              <QuestionUpdateForm/>
              </div>}
            <input type="text" className="w-100 mb-3 py-2 px-4 border-0 border-bottom bg-white border-5 rounded-0" placeholder="Exam Title" value={title} onChange={handleChange}/>
            <QuestionForm/>
            {question && question.map((q, index) => {
            return <Question key={index} index={index} data={q} />
            })}
        </div>
    )
}