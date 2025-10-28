import { signOut } from 'firebase/auth';
import {auth} from './firebase';
import { useAuth } from './context/AuthContext';
import { Link } from 'react-router-dom';
import './assets/header.css';
import toast from 'react-hot-toast';

const Header = ({title})=>{
        const {user,mini} = useAuth();
        async function handelLogout(){
            try {
                await signOut(auth);
                toast.success('Logged out successfully!');
            }catch (err){
                console.log(err);
                toast.error(err);
            }
        }
    return(
        <>
            <header className={`d-flex align-items-center justify-content-between ${mini && "mini"}`}>
                <span className='title'>{title}</span>
                <div className="right">
                    <div className="userSection user d-flex align-items-center gap-3">
                    {user?(
                    <span style={{fontWeight:"bold"}}>Hello, <span style={{fontWeight:"normal"}}>{user.email}</span></span>
                    ):
                    (
                        <h2>hello Guest</h2>
                    )
                    }
                    <div className="icon">
                        <i class="fa-regular fa-user"></i>
                    </div>
                    </div>
                    {user?(
                        <Link style={{textDecoration:"none"}} to="/">
                        <button type="button"onClick={handelLogout}><i class="fa-solid fa-right-from-bracket"></i>Log out</button>
                        </Link>
                        ):
                        (
                        <Link to="/">
                            <button type="button">Log In</button>
                        </Link>
                        )
                    }
                </div>
                
            </header>
        </>
    )   
}


export default Header;