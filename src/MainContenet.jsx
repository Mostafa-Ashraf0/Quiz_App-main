import './assets/mainContent.css'
import { useAuth } from './context/AuthContext';


const MainContent = ({children})=>{
    const {mini} = useAuth();
    return(
        <div className={`main ${mini && "mini"}`}>
            {children}
        </div>
    )
};

export default MainContent;