import {Card,Form,Button,Alert} from 'react-bootstrap';
import { useNavigate,useParams } from 'react-router-dom';
import { useAuth } from "./context/AuthContext";
import { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore"; 
import {db} from "./firebase";

const SubmitForm = ()=>{
    const [sName, setSName] = useState(null);
    const [title, setTitle] = useState(null);
    const { setSubmition,user } = useAuth();
    const navigate = useNavigate();
    const { examId } = useParams();
    const handleSubmit = (e)=>{
        e.preventDefault();
        setSubmition({name:sName,q:[]});
        navigate(`/exam/${examId}`);
    }
    const handleChange = (e)=>{
        setSName(e.target.value);
    }
useEffect(() => {
    const fetchTitle = async () => {
      try {
        if (!user || !examId) return; 
        const docRef = doc(db, `users/${user.uid}/exams`, examId);
        const snapshot = await getDoc(docRef);
        const data = snapshot.data();
        setTitle(data.title); 

      } catch (err) {
        alert(err.message);
      }
    };

    fetchTitle();
  }, [examId, user]);

    return(
        <div className='d-flex align-items-center justify-content-center h-100 px-2'>
        <Card style={{width:"500px"}}>
            <Card.Body className='d-flex flex-column gap-3'>
                <div className="info d-flex flex-column gap-2">
                    <h4 className='p-0 m-0'>{title?title:"..loading exam"}</h4>
                </div>
                <Form onSubmit={handleSubmit} className='d-flex flex-column gap-3 w-100'>
                    <Form.Group>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type='text' onChange={handleChange} required/>
                    </Form.Group>
                    <Button type='submit'>Start Exam</Button>
                </Form>
            </Card.Body>
        </Card>
        </div>
    )
}

export default SubmitForm;