import {Card,Form,Button} from 'react-bootstrap';
import { Link } from 'react-router-dom'
function ForgotPassword() {
  return (
    <>
    <Card style={{width:"400px"}}>
        <Card.Body>
            <h2 className='mb-4 text-center'>Reset Password</h2>
            <Form>
                <Form.Group className='d-flex flex-column align-items-start mb-3'>
                    <Form.Label htmlFor='email'>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Button variant="primary" size="sm" className='w-100' >
                    Reset Password
                </Button>
            </Form>
            <div className='w-100 text-center mt-4'>
                <Link to='/Signin'>Sign In</Link>
            </div>
        </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>Need an account   <Link to='/Signup'>Sign Up</Link></div>
    </>

  );
}

export default ForgotPassword;