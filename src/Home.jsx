import Question from './Question'
import { Link } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { signOut } from 'firebase/auth'
import {auth} from './firebase'




export default function Home(){
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
    
    return (
        <>
            {user?(
                <Link to="/Signin">
                <button onClick={handelLogout}>
                Log out</button>
            </Link>
            ):
            (
            <Link to="/Signin">
                <button>
                Log in</button>
            </Link>
            )
            }
            {user?(
                <h2 style={{color:"green"}}><span style={{color:"black"}}>hello</span> {user.email}</h2>
            ):
            (
                <h2>hello Guest</h2>
            )
            }
            <Link to={"/Exam"}><button>Create new exam</button></Link>
        </>
)}