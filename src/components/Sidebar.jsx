import '../assets/sidebar.css';
import logo from '../assets/logo.svg';
import miniLogo from '../assets/miniLogo.png';
import { useAuth } from '../context/AuthContext';
import {Timestamp} from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar"

const SideBar = ()=>{
    const navigate = useNavigate();
    const {mini,setMini,activeTab,setActiveTab} = useAuth();
     const items = [
    {
      title: "Dashboard",
      icon: "fa-solid fa-grip",
      key: "home",
      onClick: () => {
        navigate("/home");
        setActiveTab("home");
      },
    },
    {
      title: "Analytics",
      icon: "fa-solid fa-chart-simple",
      key: "analytics",
      onClick: () => setActiveTab("analytics"),
    },
    {
      title: "Settings",
      icon: "fa-solid fa-gears",
      key: "settings",
      onClick: () => setActiveTab("settings"),
    },
    {
      title: "Toggle",
      icon: "fa-solid fa-expand",
      key: "toggle",
      onClick: () => setMini(!mini),
    },
  ];



    return(
    <SidebarContent>
        <SidebarHeader>
            <img src={logo} className='icon'/>
        </SidebarHeader>
        <SidebarGroup>
            <SidebarGroupContent>
            <SidebarMenu>
                {items.map((item) => (
                <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                    isActive={activeTab === item.key}
                    onClick={item.onClick}
                    >
                    <i className={item.icon} />
                    <span>{item.title}</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    </SidebarContent>
    )
};

export default SideBar;