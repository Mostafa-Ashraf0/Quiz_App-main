import { useEffect, useRef } from "react";
import { useAuth } from "./context/AuthContext";
import { addDoc, collection, onSnapshot } from "firebase/firestore"; 
import { db } from "./firebase";
import Form from 'react-bootstrap/Form';
import toast from "react-hot-toast";
import './assets/questionForm.css';

export default function QuestionForm() {
    const { addQuestion, examId } = useAuth();
    const questionText = useRef(null);
    const optionA = useRef(null);
    const optionB = useRef(null);
    const optionC = useRef(null);
    const optionD = useRef(null);
    const answer = useRef(null);

    useEffect(() => {
        if (!examId) return;

        const qRef = collection(db, "questions", examId, "items");
        const unsubscribe = onSnapshot(qRef, (snapshot) => {
            const qData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            addQuestion(qData);
        });

        return () => unsubscribe();
    }, [examId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newQuestion = {
            questionText: questionText.current.value,
            A: optionA.current.value.trim(),
            B: optionB.current.value.trim(),
            C: optionC.current.value.trim(),
            D: optionD.current.value.trim(),
            Answer: answer.current.value.trim(),
        };
        await addDoc(collection(db, "exam", examId, "questions"), newQuestion);

        toast.success("question added");
        questionText.current.value = "";
        optionA.current.value = "";
        optionB.current.value = "";
        optionC.current.value = "";
        optionD.current.value = "";
        answer.current.value = "";
    };

    return (
            <Form onSubmit={handleSubmit} className="p-4 border border-muted rounded-1 mb-3" style={{backgroundColor:"white"}}>
                <Form.Group className="mb-4" controlId="formGroupEmail">
                    <Form.Control
                        className="bg-light"
                        type="text"
                        placeholder="Enter The Question"
                        ref={questionText}
                        required
                        style={{borderBottom:"solid 5px #0F1E33"}}
                    />
                </Form.Group>

                <div className="bar">
                    <Form.Group className="group d-flex align-items-center w-50">
                        <Form.Label className="m-0 me-2">A:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="First choice"
                            className="inp border-0 border-start border-primary border-3 rounded-1 bg-light"
                            ref={optionA}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="group d-flex align-items-center w-50">
                        <Form.Label className="m-0 me-2">B:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Second choice"
                            className="inp border-0 border-start border-primary border-3 rounded-1 bg-light"
                            ref={optionB}
                            required
                        />
                    </Form.Group>
                </div>

                <div className="bar">
                    <Form.Group className="group d-flex align-items-center w-50">
                        <Form.Label className="m-0 me-2">C:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Third choice"
                            className="inp border-0 border-start border-primary border-3 rounded-1 bg-light"
                            ref={optionC}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="group d-flex align-items-center w-50">
                        <Form.Label className="m-0 me-2">D:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Fourth choice"
                            className="inp border-0 border-start border-primary border-3 rounded-1 bg-light"
                            ref={optionD}
                            required
                        />
                    </Form.Group>
                </div>

                <div className="bar">
                    <Form.Group className="group d-flex align-items-center w-50">
                    <Form.Label className="m-0 me-2">Answer:</Form.Label>
                    <Form.Control
                            type="text"
                            placeholder="Right Answer"
                            className="inp border-0 border-bottom border-success border-3 rounded-0 bg-light"
                            ref={answer}
                            required
                        />
                    </Form.Group>
                    <button type="submit" className="px-5 btn btn-primary">Add</button>
                </div>
            </Form>
    );
}
