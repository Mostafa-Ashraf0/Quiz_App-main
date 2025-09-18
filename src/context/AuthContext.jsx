import { Children, createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged,signInWithEmailAndPassword,signOut } from "firebase/auth";
import auth from "../firebase";
const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [logged, setLogged] = useState(false);
    const signup = (email , password)=>{
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const signin = async(email,password) =>{
        const userCredintial = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredintial.user);
        return userCredintial;
    };
    const signout = ()=>{
        return signOut(auth)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
            setUser(user);
            setLoading(false);
        });
        return ()=>{
            unsubscribe();
        }
    },[]);
    return(
        <AuthContext.Provider value={{user, 
        signup,
        signin,
        signout,
        logged,
        setLogged
        }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}


export const useAuth = ()=>{
    return useContext(AuthContext);
};