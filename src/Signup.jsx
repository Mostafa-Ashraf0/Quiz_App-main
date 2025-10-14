import {Card,Form,Button,Alert} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext'
import { useRef, useState } from 'react';
import {db} from "./firebase"
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, Timestamp } from "firebase/firestore"; 

function Signup() {
    const navigate = useNavigate();
    const {signup} = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const emailRef = useRef();
    const passwordRef = useRef();
    const passConfirmRef = useRef();
    const handleSubmet = async (e) =>{
        e.preventDefault();
        if(passwordRef.current.value !== passConfirmRef.current.value){
            setError("password not match");
            return;
        }
        try{
            setError("");
            setLoading(true);
            const userCredential = await signup(emailRef.current.value, passwordRef.current.value);
            const user = userCredential.user;
            const userData = {
                email: user.email,
                createdAt: Timestamp.now()
            };
            await setDoc(doc(db,"users",user.uid),userData);
            navigate("/");
        }catch(err){
            console.error(err); 
            setError(err.message);
        }finally{
            setLoading(false);
        }
        
    }
  return (
    <div className='d-flex flex-column align-items-center justify-content-center h-100' style={{background:"linear-gradient(120deg, #1e3c72 0%, #2a5298 100%)"}}>
        <h2 className='mb-5' style={{color:"white"}}>Welcome to <span style={{color:"#66a6ff",textShadow:"0 0 10px rgba(255,255,255,0.5)",fontSize:"40px"}}>QuizHub</span></h2>
    <Card style={{width:"400px",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.3)",background:"rgba(255, 255, 255, 0.1)",color:"white"}}>
        <Card.Body className='p-4'>
            <h2 className='mb-4 text-center'>Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmet}>
                <Form.Group className='d-flex flex-column align-items-start mb-3'>
                    <Form.Label htmlFor='email'>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" ref={emailRef}/>
                </Form.Group>
                <Form.Group className='d-flex flex-column align-items-start mb-3'>
                    <Form.Label htmlFor='password'>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef}/>
                </Form.Group>
                <Form.Group className='d-flex flex-column align-items-start mb-3'>
                    <Form.Label htmlFor='password-confirm'>Confirm Password</Form.Label>
                    <Form.Control type="password" ref={passConfirmRef}/>
                </Form.Group>
                <Button type='submit' variant="primary" size="sm" className='w-100' disabled={loading}>
                    Sign Up
                </Button>
            </Form>
        </Card.Body>
    </Card>
        <div className='w-100 text-center mt-2' style={{color:"#66a6ff",textShadow:"0 0 10px rgba(255,255,255,0.5)"}}>
            I have an account <Link to='/Signin' style={{color:"white"}}>Log in</Link>
        </div>
    </div>
  );
}

export default Signup;