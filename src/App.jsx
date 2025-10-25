import './App.css';
import Home from './Home';
import Signup from './Signup'
import Signin from './Signin';
import ForgotPassword from './ForgotPassword';
import SubmitForm from './SubmitForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Exam from './Exam';
import ExamSubmit from './ExamSubmit';
import FinalResult from './FinalResult';

function App() {

  return (
      <Router>
        <Routes>
          <Route path='/finalResult' element={<FinalResult/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/home/Exam' element={<Exam/>}></Route>
          <Route path='/exam/:examId' element={<ExamSubmit/>}></Route>
          <Route path='/Signup' element={<Signup/>}></Route>
          <Route path='/' element={<Signin/>}></Route>
          <Route path='/ForgotPassword' element={<ForgotPassword/>}></Route>
          <Route path='/exam/:examId/form' element={<SubmitForm/>}></Route>
        </Routes>
      </Router>
  )
}

export default App
