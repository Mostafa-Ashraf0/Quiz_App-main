import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { collection, addDoc,Timestamp, getDocs, deleteDoc,doc} from "firebase/firestore"; 
import {db} from "./firebase";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ExamsList = ()=>{
    const {setExamId,user} = useAuth();
    const [exams,setExams] = useState([]);
    const navigate = useNavigate();
    const handleCreateExam = async()=>{
        try{
            const exam = {
                title:"New Exam",
                createdAt: Timestamp.now()
            }
            const examRef = await addDoc(collection(db,`users/${user.uid}/exams`),exam);
            localStorage.setItem("examId",examRef.id);
            setExamId(examRef.id);
        }catch(err){
            alert(err);
        }
    }
        const handleDeleteExam = async(id)=>{
            try{
                //delete examId from user
                const userExamRef = doc(db, `users/${user.uid}/exams`, id);
                await deleteDoc(userExamRef);

                //delete all questions
                const questionsSnap = await getDocs(collection(db, `exam/${id}/questions`));
                for (const q of questionsSnap.docs) {
                await deleteDoc(q.ref);
                }
                //delete examId from exams
                const examRef = doc(db, "exam", id);
                await deleteDoc(examRef);
                alert("Exam Deleted");

            }catch(err){
                alert(err);
            }
        }

    const handleViewExam = (id)=>{
            //setExamId(id);
            localStorage.setItem("examId",id);
            navigate("./Exam");
    }

    useEffect(() => {
        if(!user) return;
        const fetchExams = async () => {
            try {
                const snapshot = await getDocs(collection(db,`users/${user.uid}/exams`));       
                const examsData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setExams(examsData);      
            } catch (err) {
            alert(err.message);
            }
        };

        fetchExams();
        }, [user,exams]);
    return(
        <div className='p-5 d-flex flex-column gap-3'>
            <div className="head d-flex align-items-center gap-5 mb-3">
                <h3>Exams List</h3>
                <Link to={"/Exam"}><button onClick={handleCreateExam} className='btn btn-success'>Create new exam</button></Link>
            </div>
            {exams.length>0?exams.map((ex)=>(
               <div class="card w-50 " key={ex.id}>
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <h5 class="card-title p-0 m-0">{ex.title}</h5>
                        <div className="buttons d-flex gap-2">
                            <button className='btn btn-light border border-secoundary' onClick={()=>handleViewExam(ex.id)}>View/Edit</button>
                            <button className='btn btn-danger' onClick={()=>handleDeleteExam(ex.id)}>Delete</button>
                        </div>
                    </div>
                </div>   
            )):<h2>no exams yet</h2>}
            
        </div>
    )
}


export default ExamsList;