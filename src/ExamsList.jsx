import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { collection, addDoc,Timestamp, getDocs} from "firebase/firestore"; 
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

    const handleViewExam = (id)=>{
            setExamId(id);
            navigate("./Exam");
    }

    useEffect(() => {
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
        }, [user.uid]);
    return(
        <div className='p-5 d-flex flex-column gap-3'>
            {console.log(exams)}
            {exams.length>0?exams.map((ex)=>(
               <div class="card w-75" key={ex.id}>
                    <div class="card-body">
                        <h5 class="card-title">{ex.title}</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <button className='btn btn-primary' onClick={()=>handleViewExam(ex.id)}>View/Edit</button>
                    </div>
                </div>   
            )):<h2>no exams yet</h2>}
            <Link to={"/Exam"}><button onClick={handleCreateExam} className='btn btn-secondary'>Create new exam</button></Link>
        </div>
    )
}


export default ExamsList;