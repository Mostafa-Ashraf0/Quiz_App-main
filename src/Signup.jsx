import {Card,Form,Button,Alert} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext'
import { useRef, useState } from 'react';
function Signup() {
    const {signup,setLogged} = useAuth();
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
            await signup(emailRef.current.value, passwordRef.current.value);
            setLogged(true);
        }catch(err){
            console.error(err); 
            setError(err.message);
        }finally{
            setLoading(false);
        }
        
    }
  return (
    <>
    <Card style={{width:"400px"}}>
        <Card.Body>
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
    <div className='w-100 text-center mt-2'>I have an account <Link to='/Signin'>Log in</Link></div>
    </>
  );
}

export default Signup;