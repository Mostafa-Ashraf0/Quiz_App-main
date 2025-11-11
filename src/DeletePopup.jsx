import { useAuth } from './context/AuthContext';
import './assets/deletePopup.css';
import { collection,Timestamp, getDocs, deleteDoc,doc} from "firebase/firestore"; 
import {db} from "./firebase";
import toast from 'react-hot-toast';
import { useState } from 'react';

const DeletePopup = ()=>{
    const {deletePopupView,setDeletePopupview,user,deleteExamId,setExams} = useAuth();
    const [loading,setLoading] = useState(false);
        const handleDelete = async () => {
            setLoading(true);
            try {
                // delete examId from user
                const userExamRef = doc(db, `users/${user.uid}/exams`, deleteExamId);
                await deleteDoc(userExamRef);

                // delete all questions
                const questionsSnap = await getDocs(collection(db, `exam/${deleteExamId}/questions`));
                for (const q of questionsSnap.docs) {
                await deleteDoc(q.ref);
                }

                // delete examId from exams
                const examRef = doc(db, "exam", deleteExamId);
                await deleteDoc(examRef);
                toast.success("exam deleted");
                setExams(prev=>prev.filter(exam=>exam.id !== deleteExamId));
                setDeletePopupview(false);
                setLoading(false)
            } catch (err) {
                toast.error(err);
            }
            };

    const handleCancel = ()=>{
        setDeletePopupview(false);
    }
    return(
        <div className='deletePopup' style={deletePopupView?
        {display:"flex"}:
        {display:"none"}}>
            Are you sure you want to delete this item?
            <div className="btns">
                <button className='btn btn-success' onClick={handleDelete}>{loading?"Deleting...":"Delete"}</button>
                <button className='btn btn-danger' onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
};

export default DeletePopup;