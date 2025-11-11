import './assets/sidebar.css';
import logo from './assets/logo.svg';
import miniLogo from './assets/miniLogo.png';
import { useAuth } from './context/AuthContext';
import {Timestamp} from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';

const Sidebar = ()=>{
    const navigate = useNavigate();
    const {mini,setMini,activeTab,setActiveTab} = useAuth();
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
                    <li onClick={handleDashboard} className={activeTab==="home"?"tab active":"tab"}><i className="fa-solid fa-grip"></i><span>Dashboard</span></li>
                    <li onClick={handleAnalytics} className={activeTab==="analytics"?"tab active": "tab"}><i className="fa-solid fa-chart-simple"></i><span>Analytics</span></li>
                    <li onClick={handleSettings} className={activeTab==="settings"?"tab active": "tab"}><i className="fa-solid fa-gears"></i><span>Settings</span></li>
                    <li onClick={handleSize} className="tab"><i className="fa-solid fa-expand"></i><span>Toggle</span></li>
                </ul>
            </div>
        </div>
    )
};

export default Sidebar;