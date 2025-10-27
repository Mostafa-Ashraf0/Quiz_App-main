import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { collection, addDoc,Timestamp, getDocs} from "firebase/firestore"; 
import {db} from "./firebase";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './assets/examsList.css';
import LinkPopup from './LinkPopup';
import DeletePopup from './DeletePopup';

const ExamsList = ()=>{
    const {setExamId,user,setPopupView,setDeleteExamId,setDeletePopupview} = useAuth();
    const [exams,setExams] = useState([]);
    const [link, setLink] = useState(null);
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
        const handleDeleteExam = (id)=>{
            setDeleteExamId(id);
            setDeletePopupview(true);
        }

    const handleViewExam = (id)=>{
            //setExamId(id);
            localStorage.setItem("examId",id);
            navigate("./Exam");
    }
    const handleShare = (id)=>{
        const link = `${window.location.origin}/exam/${id}/form`;
        setLink(link);
        setPopupView(true);
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
        <div className='px-4 py-5 d-flex flex-column gap-3'>
            <LinkPopup link={link}/>
            <DeletePopup/>
            <div className="head d-flex align-items-center justify-content-between gap-5 mb-3">
                <h3>Exams List</h3>
                <Link to={"./Exam"} style={{textDecoration:"none"}}>
                    <button onClick={handleCreateExam} className='create btn btn-primary'>
                        <i class="fa-solid fa-plus"></i>New Exam
                    </button>
                </Link>
            </div>
            {exams.length>0?exams.map((ex)=>(
               <div class="card w-100 " key={ex.id} style={{background:"rgba(255, 255, 255, 0.1)"}}>
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <div className="examInfo">
                            <h5 class="card-title p-0 m-0">{ex.title}</h5>
                            <div className="small">
                                <ul>
                                    <li>Exam Id: {ex.id} </li>
                                    <li>|</li>
                                    <li>10 Questions</li>
                                </ul>
                            </div>
                        </div>
                        <span className='date-time'>{ex.createdAt.toDate().toLocaleString()}</span>
                        <div className="buttons d-flex gap-2">
                            <button className='view btn btn-primary border border-1 border-secondary-subtle' onClick={()=>handleViewExam(ex.id)}><i class="fa-solid fa-eye"></i>View/Edit</button>
                            <button className='update btn btn-warning border border-1 border-secondary-subtle' onClick={()=>handleShare(ex.id)}><i class="fa-solid fa-share-nodes"></i>Share</button>
                            <button className='delete btn btn-danger border border-1 border-secondary-subtle' onClick={()=>handleDeleteExam(ex.id)}><i class="fa-solid fa-trash"></i>Delete</button>
                        </div>
                    </div>
                </div>   
            )):<h2>no exams yet</h2>}
            
        </div>
    )
}


export default ExamsList;