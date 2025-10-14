import { signOut } from 'firebase/auth';
import {auth} from './firebase';
import { useAuth } from './context/AuthContext';
import { Link } from 'react-router-dom';

const Header = ()=>{
        const {user} = useAuth();
        async function handelLogout(){
            try {
                await signOut(auth);
                alert("signed out successfuly")
            }catch (err){
                console.log(err);
                alert(err);
            }
        }
    return(
        <>
            <header className="d-flex align-items-center justify-content-between p-4" style={{height:"70px",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.3)",background:"linear-gradient(90deg, #2a5298 0%, #1e3c72 100%)",color:"white"}}>
                <div className="user d-flex align-items-center gap-2">
                    {user?(
                    <span>hello, <span style={{color:"green"}}>{user.email}</span></span>
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
                <Link to="/Signin">
                <button type="button" class="btn btn-primary" onClick={handelLogout}>Log Out</button>
                </Link>
                ):
                (
                <Link to="/Signin">
                    <button type="button" class="btn btn-primary">Log In</button>
                </Link>
                )
                }
                
            </header>
        </>
    )   
}


export default Header;