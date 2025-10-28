import { useAuth } from "./context/AuthContext";
import './assets/finalResult.css';

const FinalResult = ()=>{
    const {grade, question} = useAuth();
    return(
        <div className="final">
            <div className="final-inner">
                <h4>Submition Saved</h4>
                <h6>Your Grade is: <span>{grade}/{question.length}</span></h6>
            </div>
        </div>
    )
};

export default FinalResult;