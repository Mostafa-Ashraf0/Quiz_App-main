import './assets/sidebar.css';
import logo from './assets/logo.svg';
import { useAuth } from './context/AuthContext';
import { collection, addDoc,Timestamp} from "firebase/firestore"; 
import {db} from "./firebase";
import { useNavigate } from 'react-router-dom';
const Sidebar = ()=>{
    const navigate = useNavigate();
    const {setExamId,user} = useAuth();
    const handleCreateExam = async()=>{
        try{
            const exam = {
                title:"New Exam",
                createdAt: Timestamp.now()
            }
            const examRef = await addDoc(collection(db,`users/${user.uid}/exams`),exam);
            localStorage.setItem("examId",examRef.id);
            setExamId(examRef.id);
            navigate("./Exam");
        }catch(err){
            alert(err);
        }
    }
    const handleDashboard = ()=>{
        navigate("/home")
    }
    return(
        <div className='sidebar'>
            <div className='icon'>
                <img src={logo} alt="logo" />
            </div>
            <div className="master">
                <ul>
                    <li onClick={handleDashboard}><i class="fa-solid fa-grip"></i>Dashboard</li>
                    <li onClick={handleCreateExam}><i class="fa-solid fa-square-plus"></i>Create New Exam</li>
                    <li><i class="fa-solid fa-chart-simple"></i>Analytics</li>
                    <li><i class="fa-solid fa-gears"></i>Settings</li>
                </ul>
            </div>
        </div>
    )
};

export default Sidebar;