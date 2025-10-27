import './assets/sidebar.css';
import logo from './assets/logo.svg';
import miniLogo from './assets/miniLogo.png';
import { useAuth } from './context/AuthContext';
import { collection, addDoc,Timestamp} from "firebase/firestore"; 
import {db} from "./firebase";
import { useNavigate } from 'react-router-dom';

const Sidebar = ()=>{
    const navigate = useNavigate();
    const {setExamId,user,mini,setMini,activeTab,setActiveTab} = useAuth();
    const handleCreateExam = async()=>{
        setActiveTab("exam");
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
        navigate("/home");
        setActiveTab("home");
    }

    const handleAnalytics = ()=>{
        setActiveTab("analytics");
    }

    const handleSettings = ()=>{
        setActiveTab("settings");
    }

    const handleSize = ()=>{
        setMini(!mini);
    }

    return(
        <div className={`sidebar ${mini && "mini"}`}>
            <div className='icon'>
                <img className='logo' src={mini?miniLogo:logo} alt="logo" />
            </div>
            <div className="master">
                <ul>
                    <li onClick={handleDashboard} className={activeTab==="home"?"tab active":"tab"}><i class="fa-solid fa-grip"></i><span>Dashboard</span></li>
                    <li onClick={handleCreateExam} className={activeTab==="exam"?"tab active": "tab"}><i class="fa-solid fa-square-plus"></i><span>Create New Exam</span></li>
                    <li onClick={handleAnalytics} className={activeTab==="analytics"?"tab active": "tab"}><i class="fa-solid fa-chart-simple"></i><span>Analytics</span></li>
                    <li onClick={handleSettings} className={activeTab==="settings"?"tab active": "tab"}><i class="fa-solid fa-gears"></i><span>Settings</span></li>
                    <li onClick={handleSize} className="tab"><i class="fa-solid fa-expand"></i><span>Expand</span></li>
                </ul>
            </div>
        </div>
    )
};

export default Sidebar;