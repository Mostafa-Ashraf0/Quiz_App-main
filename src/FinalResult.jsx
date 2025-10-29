import { useAuth } from "./context/AuthContext";
import './assets/finalResult.css';

const FinalResult = ()=>{
    const {grade, question} = useAuth();
    return(
        <div className="final">
            <div className="final-inner">
                <h4 style={{marginBottom:"20px"}}>Your Results</h4>
                <div className="circle">
                    <span className="main">{grade}</span>
                    <span className="total">of {question.length}</span>
                </div>
                <div className="para">
                    <span className="para-title">{grade/question.length >= 0.5?"Great":"Dont give up"}</span>
                    <p>
                        {grade/question.length >= 0.5?
                        "You passed this quiz successfuly":
                        "You failed this time please try again later"}
                    </p>
                </div>
            </div>
        </div>
    )
};

export default FinalResult;