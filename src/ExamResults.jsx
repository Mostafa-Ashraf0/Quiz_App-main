import { getDocs,collection } from "firebase/firestore";
import {db} from "./firebase";
import { useAuth } from "./context/AuthContext";
import { useEffect, useState } from "react";

const ExamResults = ()=>{
    const { setExamId, examId } = useAuth();
    const [results, setResults] = useState([]);
    useEffect(()=>{
            setExamId(localStorage.getItem("examId"));
    },[]);

    useEffect(()=>{
        const fetchSubmitions = async()=>{
            try{
                if (!examId) return;
                const sRef = collection(db, `exam/${examId}/submitions`);
                const submitionDocs = await getDocs(sRef);
                const SubmitionData = submitionDocs.docs.map(doc=>(
                    {
                        id: doc.id,
                        ...doc.data(),
                    }
                ))
                setResults(SubmitionData);
                console.log(SubmitionData);
            }catch(err){
                console.log(err);
            }
        };
        fetchSubmitions();
    },[examId])
    return(
        <div className="table" style={{padding:"20px"}}>
            <table style={{
                    width: "100%",
                    borderCollapse: "separate",
                    borderSpacing: "0 10px",
                    textAlign: "left",
                    fontFamily: "Poppins, sans-serif",
                }}>
                <thead>
                    <tr style={{ backgroundColor: "#1e293b", color: "white" }}>
                        <th style={{ padding: "12px 20px", borderRadius: "8px 0 0 8px" }}>Name</th>
                        <th style={{ padding: "12px 20px", borderRadius: "0 8px 8px 0" }}>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((ele, index) => (
                    <tr key={index}  style={{
                    backgroundColor: index % 2 === 0 ? "#f8fafc" : "#e2e8f0",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    color:"#1e293b",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    }}>
                        <td style={{ padding: "12px 20px", borderRadius: "8px 0 0 8px" }}>{ele.name}</td>
                        <td style={{ padding: "12px 20px", borderRadius: "0 8px 8px 0" }}>{`${ele.grade}/${ele.q.length}`}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default ExamResults;