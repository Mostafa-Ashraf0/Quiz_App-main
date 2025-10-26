import {Card,Form,Button,Alert} from 'react-bootstrap';
import { useNavigate,useParams } from 'react-router-dom';
import { useAuth } from "./context/AuthContext";
import { useState } from 'react';

const SubmitForm = ()=>{
    const [sName, setSName] = useState(null);
    const { setSubmition } = useAuth();
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
    return(
        <div className='d-flex align-items-center justify-content-center h-100'>
        <Card style={{width:"500px", height:"250px"}}>
            <Card.Body className='d-flex flex-column gap-3'>
                <div className="info d-flex flex-column gap-2">
                    <h4 className='p-0 m-0'>Exam Title</h4>
                    <h6 className='p-0 m-0'>Exam duration</h6>
                </div>
                <Form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
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