import { useAuth } from "./context/AuthContext";

function QuestionSubmit({data,index,id}) {
    const { setSubmition } = useAuth();
    const handleChange = (e)=>{
        const selected = e.target.value;
        setSubmition(prev=>{
            const existing = prev.find(a => a.qId === id);
            if(existing){
                return prev.map(a =>{
                    return a.qId === id? {...a, answer: selected}: a;
                })
            }else{
                return [...prev, {qId:id, answer:selected}];
            }
        })
    }
    return (
        <div className="question-body bg-light border border-secoundary border-2 rounded-3 p-4 mb-3">
            <div className="title d-flex align-items-center gap-2 mb-2" style={{fontSize:"20px"}}>
                <h4>{index +1}-</h4>
                <h4>{data.questionText}</h4>
            </div>
            <div className="d-flex flex-column align-items-start justify-content-between w-100">
                <div className="block d-flex align-items-center gap-2">
                    <input type="radio" name={`answer${index}`} value={data.A} onChange={handleChange}/>
                    <label htmlFor={data.A}>{data.A}</label>
                </div>
                <div className="block d-flex align-items-center gap-2">
                    <input type="radio" name={`answer${index}`} value={data.B} onChange={handleChange}/>
                    <label htmlFor={data.B}>{data.B}</label>
                </div>
                <div className="block d-flex align-items-center gap-2">
                    <input type="radio" name={`answer${index}`} value={data.C} onChange={handleChange}/>
                    <label htmlFor={data.C}>{data.C}</label>
                </div>
                <div className="block d-flex align-items-center gap-2">
                    <input type="radio" name={`answer${index}`} value={data.D} onChange={handleChange}/>
                    <label htmlFor={data.D}>{data.D}</label>
                </div>
            </div>
        </div>
    )
}

export default QuestionSubmit;