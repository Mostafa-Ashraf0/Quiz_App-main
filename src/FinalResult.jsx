import { useAuth } from "./context/AuthContext"


const FinalResult = ()=>{
    const {grade} = useAuth();
    return(
        <>
            Your Grade is {grade}
        </>
    )
};

export default FinalResult;