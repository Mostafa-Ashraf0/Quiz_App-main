import {Card,Form,Button,Alert} from 'react-bootstrap';
import { useNavigate,useParams } from 'react-router-dom';

const SubmitForm = ()=>{
    const navigate = useNavigate();
    const { examId } = useParams();
    const handleSubmit = ()=>{
        navigate(`/${examId}`)
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
                        <Form.Control type='text' required/>
                    </Form.Group>
                    <Button type='submit'>Start Exam</Button>
                </Form>
            </Card.Body>
        </Card>
        </div>
    )
}

export default SubmitForm;