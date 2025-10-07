import { useEffect, useRef } from "react";
import { useAuth } from "./context/AuthContext";
import { addDoc, collection, onSnapshot } from "firebase/firestore"; 
import {db} from "./firebase"
import Form from 'react-bootstrap/Form';

export default function QuestionForm(){
    const {addQuestion, examId} = useAuth();
    const questionText = useRef(null);
    const optionA = useRef(null);
    const optionB = useRef(null);
    const optionC = useRef(null);
    const optionD = useRef(null);
    const answer = useRef(null);
    useEffect(()=>{
        if(!examId){
            return;
        }
        const qRef = collection(db,"questions",examId,"items");
        const unsubscribe = onSnapshot(qRef,(snapshot)=>{
            const qData = snapshot.docs.map((doc)=>({
                id: doc.id,
                ...doc.data()
            }));  
            addQuestion(qData);
        })
        
        return ()=> unsubscribe();
    },[examId])
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const newQuestion = {
            "questionText":questionText.current.value,
            "A":optionA.current.value,
            "B":optionB.current.value,
            "C":optionC.current.value,
            "D":optionD.current.value,
            "Answer":answer.current.value
        }
        await addDoc(collection(db,"exam",examId,"questions"),newQuestion)
        questionText.current.value = "";
        optionA.current.value = "";
        optionB.current.value = "";
        optionC.current.value = "";
        optionD.current.value = "";
        answer.current.value = "";
    }
    return(
        <div>
            <Form onSubmit={handleSubmit} className="py-4 px-4 border border-muted rounded-1">
                <Form.Group className="mb-4" controlId="formGroupEmail">
                    <Form.Control className="border-0 border-bottom border-primary border-3 rounded-0 bg-light" type="text" placeholder="Enter The Question" ref={questionText} required/>
                </Form.Group>
                <Form.Group className="mb-1 d-flex align-items-center w-50">
                    <Form.Label className="m-0 me-2">A:</Form.Label>
                    <Form.Control type="text" placeholder="First choise" className="border-0 border-start border-primary border-3 rounded-1 bg-light" ref={optionA} required/>
                </Form.Group>
                <Form.Group className="mb-1 d-flex align-items-center w-50">
                    <Form.Label className="m-0 me-2">B:</Form.Label>
                    <Form.Control type="text" placeholder="Secound choise" className="border-0 border-start border-primary border-3 rounded-1 bg-light"  ref={optionB} required/>
                </Form.Group >
                <Form.Group className="mb-1 d-flex align-items-center w-50">
                    <Form.Label className="m-0 me-2">C:</Form.Label>
                    <Form.Control type="text" placeholder="Third choise" className="border-0 border-start border-primary border-3 rounded-1 bg-light"  ref={optionC} required/>
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center w-50">
                    <Form.Label className="m-0 me-2">D:</Form.Label>
                    <Form.Control type="text" placeholder="Fourth choise" className="border-0 border-start border-primary border-3 rounded-1 bg-light"  ref={optionD} required/>
                </Form.Group>
                <Form.Group className="mb-3 d-flex align-items-center w-50">
                    <Form.Label className="m-0 me-2">Answer:</Form.Label>
                    <Form.Control type="text" placeholder="Right Answer" className="border-0 border-bottom border-success border-3 rounded-0 bg-light" ref={answer} required/>
                </Form.Group>
                <button type="submit" className="btn btn-primary">Add</button>
            </Form>
        </div>
    )
}