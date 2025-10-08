import { useAuth } from "./context/AuthContext"

function Question({data,index}) {
    const {setUpdateFormView,setCurrentUpdateData} = useAuth();
    const handleUpdate = (data)=>{
        setUpdateFormView(true);
        setCurrentUpdateData(data);
    }
    return (
        <div className="question-body" style={{padding:"10px",backgroundColor:"blue",marginBottom:"10px",color:"white"}}>
            <div className="title" style={{display:"flex",alignItems:"center",fontSize:"20px"}}>
                <h3>{index +1}.</h3>
                <h4>{data.questionText}</h4>
            </div>
            <select name="choose" id="choose">
                <option value={data.A}>{data.A}</option>
                <option value={data.B}>{data.B}</option>
                <option value={data.C}>{data.C}</option>
                <option value={data.D}>{data.D}</option>
            </select>
            <button onClick={()=>handleUpdate(data)} className="btn btn-primary">Update</button>
        </div>
    )
}

export default Question;