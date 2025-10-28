import { useAuth } from "./context/AuthContext"
import { db } from './firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import toast from "react-hot-toast";
import './assets/question.css';

function Question({data,index}) {
    const {setUpdateFormView,setCurrentUpdateData,examId} = useAuth();
    const handleUpdate = (data)=>{
        setUpdateFormView(true);
        setCurrentUpdateData(data);
    }
    const handleDelete = async()=>{
        try{
            const qRef = doc(db, "exam", examId, "questions", data.id);
            await deleteDoc(qRef);
            toast.success("question deleted");
        }catch(err){
            toast.error(err);
        }
    }
    return (
        <div className="question-body bg-white border border-1 border-secoundary rounded-2 py-3 px-4 mb-3">
            <div className="title d-flex align-items-center gap-2 mb-2" style={{fontSize:"20px",color:"#0F1E33"}}>
                <h5 style={{margin:"0"}}>{`${index +1})`}</h5>
                <p style={{margin:"0"}}>{data.questionText}</p>
            </div>
            <div className="cho-btn d-flex align-items-center justify-content-between w-100">
                <select className="w-25 rounded-1 p-1" name="choose" id="choose" style={{color:"#0F1E33",fontSize:"15px",height:"35px",fontWeight:"500"}}>
                    <option value={data.A}>{data.A}</option>
                    <option value={data.B}>{data.B}</option>
                    <option value={data.C}>{data.C}</option>
                    <option value={data.D}>{data.D}</option>
                </select>
                <div className="d-flex align-items-center justify-content-between gap-3">
                    <div className="answer bg-success py-2 px-4 d-flex align-items-center rounded-2" style={{color:"white"}}>
                        <span className="m-0 p-0">Answer: {data.Answer}</span>
                    </div>
                    <button onClick={()=>handleUpdate(data)} className="btn btn-warning">Update</button>
                    <button onClick={()=>handleDelete(data)} className="btn btn-primary">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Question;