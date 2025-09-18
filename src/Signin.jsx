import {Card,Form,Button,Alert} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Signin() {
    const {signin,setLogged} = useAuth();
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
            setLogged(true);
            navigate('/');
        }catch(err){
            console.error(err);
            setError(err.message);
        }
        setLoading(false);
    }
  return (
    <>
    <Card style={{width:"400px"}}>
        <Card.Body>
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
                <Link to='/ForgotPassword'>ForgotPassword</Link>
            </div>
        </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>Need an account   <Link to='/Signup'>Sign Up</Link></div>
    <div className='w-100 text-center mt-2'><Link to='/'>continue as a guest</Link></div>
    </>

  );
}

export default Signin;