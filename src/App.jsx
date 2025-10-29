import './App.css';
import Home from './Home';
import Signup from './Signup'
import Signin from './Signin';
import ForgotPassword from './ForgotPassword';
import SubmitForm from './SubmitForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Exam from './Exam';
import Results from './Results';
import ExamSubmit from './ExamSubmit';
import FinalResult from './FinalResult';
import CreateExam from './CreateExam';
import PrivateRoute from './PrivateRoutes';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
      <>
        <Toaster position="top-center" reverseOrder={false} />
        <Router>
          <Routes>
            <Route path='/finalResult' element={<FinalResult/>}/>
            <Route 
            path='/home' 
            element={
              <PrivateRoute>
                <Home/>
              </PrivateRoute>
            }/>
            <Route 
            path='/home/Exam' 
            element={
              <PrivateRoute>
                <CreateExam/>
              </PrivateRoute>
            }/>
            <Route 
            path='/home/results' 
            element={
              <PrivateRoute>
                <Results/>
              </PrivateRoute>
            }/>
            <Route path='/exam/:examId' element={<ExamSubmit/>}/>
            <Route path='/Signup' element={<Signup/>}></Route>
            <Route path='/' element={<Signin/>}></Route>
            <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
            <Route path='/exam/:examId/form' element={<SubmitForm/>}/>
          </Routes>
        </Router>
      </>
  )
}

export default App
