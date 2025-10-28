import Form from 'react-bootstrap/Form';
import './questionUpdateForm.css';
import { useAuth } from "./context/AuthContext";
import { useState } from 'react';
import { db } from './firebase';
import { updateDoc, doc } from 'firebase/firestore';
import toast from 'react-hot-toast';

const QuestionUpdateForm = ()=>{
    const {setUpdateFormView,currentUpdateData,examId} = useAuth();
    const [currentQData, setCurrentQData] = useState(currentUpdateData);
    const handleClose = ()=>{
        setUpdateFormView(false);
    }
    const handleUpdate = async(e)=>{
        e.preventDefault();
        try{
            const qRef = doc(db, "exam", examId, "questions", currentUpdateData.id);
            await updateDoc(qRef,currentQData);
            toast.success("question updated");
            setUpdateFormView(false);
        }catch(err){
            toast.error(err);
        }
    }
    const handleQTextChange = (e)=>{
        const { name, value } = e.target;
        setCurrentQData(prev => ({ ...prev, [name]: value }));
    };
    const handleAChange = (e)=>{
        const { name, value } = e.target;
        setCurrentQData(prev => ({ ...prev, [name]: value.trim() }));
    };
    const handleBChange = (e)=>{
        const { name, value } = e.target;
        setCurrentQData(prev => ({ ...prev, [name]: value.trim() }));
    }; 
    const handleCChange = (e)=>{
        const { name, value } = e.target;
        setCurrentQData(prev => ({ ...prev, [name]: value.trim() }));
    };
    const handleDChange = (e)=>{
        const { name, value } = e.target;
        setCurrentQData(prev => ({ ...prev, [name]: value.trim() }));
    };
    const handleAnswer = (e)=>{
        const { name, value } = e.target;
        setCurrentQData(prev => ({ ...prev, [name]: value.trim() }));
    }; 
    return(
            <Form onSubmit={handleUpdate} className="form-body py-4 px-4">
                <Form.Group className="mb-4" controlId="formGroupEmail">
                    <Form.Control 
                    className="bar border-0 border-bottom border-primary border-3 rounded-0 bg-light"
                     onChange={handleQTextChange}
                      type="text"
                       name='questionText'
                        value={currentQData.questionText}
                         required/>
                </Form.Group>
                <Form.Group className="group mb-1 d-flex align-items-center w-50">
                    <Form.Label className="m-0 me-2">A:</Form.Label>
                    <Form.Control
                     type="text"
                      placeholder="First choise"
                       className="bar border-0 border-start border-primary border-3 rounded-1 bg-light"
                        onChange={handleAChange}
                         name='A'
                          value={currentQData.A}
                           required/>
                </Form.Group>
                <Form.Group className="group mb-1 d-flex align-items-center w-50">
                    <Form.Label className="m-0 me-2">B:</Form.Label>
                    <Form.Control
                     type="text"
                      placeholder="Secound choise"
                       className="bar border-0 border-start border-primary border-3 rounded-1 bg-light"
                        onChange={handleBChange}
                         name='B'
                          value={currentQData.B}
                           required/>
                </Form.Group >
                <Form.Group className="group mb-1 d-flex align-items-center w-50">
                    <Form.Label className="m-0 me-2">C:</Form.Label>
                    <Form.Control
                     type="text"
                      placeholder="Third choise"
                       className="bar border-0 border-start border-primary border-3 rounded-1 bg-light"
                        onChange={handleCChange}
                         name='C'
                          value={currentQData.C}
                           required/>
                </Form.Group>
                <Form.Group className="group mb-3 d-flex align-items-center w-50">
                    <Form.Label className="m-0 me-2">D:</Form.Label>
                    <Form.Control
                     type="text"
                      placeholder="Fourth choise"
                       className="bar border-0 border-start border-primary border-3 rounded-1 bg-light"
                        onChange={handleDChange}
                         name='D'
                          value={currentQData.D}
                           required/>
                </Form.Group>
                <Form.Group className="group mb-3 d-flex align-items-center w-50">
                    <Form.Label className="m-0 me-2">Answer:</Form.Label>
                    <Form.Control
                     type="text"
                      placeholder="Right Answer"
                       className="bar border-0 border-bottom border-success border-3 rounded-0 bg-light"
                        onChange={handleAnswer}
                         name='Answer'
                          value={currentQData.Answer}
                           required/>
                </Form.Group>
                <div className="controls">
                    <button type="submit" className="btn btn-primary">Update</button>
                    <button className="btn btn-danger" onClick={handleClose}>Close</button>
                </div>
            </Form>
    )
}

export default QuestionUpdateForm