import './App.css';
import Exam from './Exam';
import Signup from './Signup'
import Signin from './Signin';
import ForgotPassword from './ForgotPassword';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
      <Router>
        <Routes>
          <Route path='/' element={<Exam/>}></Route>
          <Route path='/Signup' element={<Signup/>}></Route>
          <Route path='/Signin' element={<Signin/>}></Route>
          <Route path='/ForgotPassword' element={<ForgotPassword/>}></Route>
        </Routes>
      </Router>
  )
}

export default App
