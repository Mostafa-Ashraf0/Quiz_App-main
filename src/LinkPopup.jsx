import { useAuth } from './context/AuthContext';
import './assets/linkPopup.css';

const LinkPopup = ({link})=>{
    const {popupView,setPopupView} = useAuth();
    const handleClose = ()=>{
        setPopupView(false);
    }
    const handleCopy = ()=>{
        navigator.clipboard.writeText(link);
        alert("link copied");
    }
    return(
        <div className='popup' style={popupView?
        {display:"flex"}:
        {display:"none"}}>
            <div className='link'>{link}</div>
            <div className="btns">
                <i onClick={handleCopy} class="fa-solid fa-copy"></i>
                <button className='btn btn-danger' onClick={handleClose}>Close</button>
            </div>
        </div>
    )
};


export default LinkPopup;