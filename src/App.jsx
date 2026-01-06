import './assets/App.css';
import Home from './pages/Home';
import Signup from './components/Signup'
import Signin from './components/Signin';
import ForgotPassword from './components/ForgotPassword';
import SubmitForm from './components/SubmitForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Exam from './components/Exam';
import Results from './pages/Results';
import ExamSubmit from './components/ExamSubmit';
import FinalResult from './components/FinalResult';
import SubmittedBefore from './components/SubmittedBefore';
import CreateExam from './pages/CreateExam';
import PrivateRoute from './components/PrivateRoutes';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
      <>
        <Toaster position="top-center" reverseOrder={false} />
        <Router>
          <Routes>
            <Route path='/finalResult' element={<FinalResult/>}/>
            <Route path='/submittedBefore' element={<SubmittedBefore/>}/>
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
