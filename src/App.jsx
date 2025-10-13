import './App.css';
import Home from './Home';
import Signup from './Signup'
import Signin from './Signin';
import ForgotPassword from './ForgotPassword';
import SubmitForm from './SubmitForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Exam from './Exam';

function App() {

  return (
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/Exam' element={<Exam/>}></Route>
          <Route path='/Signup' element={<Signup/>}></Route>
          <Route path='/Signin' element={<Signin/>}></Route>
          <Route path='/ForgotPassword' element={<ForgotPassword/>}></Route>
          <Route path='/Submit' element={<SubmitForm/>}></Route>
        </Routes>
      </Router>
  )
}

export default App
