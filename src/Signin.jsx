import {Card,Form,Button,Alert} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Signin() {
    const {signin} = useAuth();
    const [loading, setLoading] = useState(false);
    const emailRef = useRef();
    const [error, setError] = useState("");
    const passwordRef = useRef();
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            setError("");
            setLoading(true);
            await signin(emailRef.current.value, passwordRef.current.value);
            navigate('/');
        }catch(err){
            console.error(err);
            setError(err.message);
        }
        setLoading(false);
    }
  return (
    <div className='d-flex flex-column align-items-center justify-content-center h-100' style={{background:"linear-gradient(120deg, #1e3c72 0%, #2a5298 100%)"}}>
        <h2 className='mb-5' style={{color:"white"}}>Welcome back to <span style={{color:"#66a6ff",textShadow:"0 0 10px rgba(255,255,255,0.5)",fontSize:"40px"}}>QuizHub</span></h2>
    <Card style={{width:"400px",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.3)",background:"rgba(255, 255, 255, 0.1)",color:"white"}}>
        <Card.Body className='p-4'>
            <h2 className='mb-4 text-center'>Sign In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className='d-flex flex-column align-items-start mb-3'>
                    <Form.Label htmlFor='email'>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" ref={emailRef}/>
                </Form.Group>
                <Form.Group className='d-flex flex-column align-items-start mb-3'>
                    <Form.Label htmlFor='password'>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef}/>
                </Form.Group>
                <Button variant="primary" size="sm" className='w-100' type='submit' disabled={loading}>
                    Sign In
                </Button>
            </Form>
            <div className='w-100 text-center mt-4'>
                <Link to='/ForgotPassword' style={{color:"white"}}>ForgotPassword</Link>
            </div>
        </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2' style={{color:"#66a6ff",textShadow:"0 0 10px rgba(255,255,255,0.5)"}}>Need an account   <Link to='/Signup' style={{color:"white"}}>Sign Up</Link></div>
    <div className='w-100 text-center mt-2'><Link to='/' style={{color:"white"}}>continue as a guest</Link></div>
    </div>

  );
}

export default Signin;