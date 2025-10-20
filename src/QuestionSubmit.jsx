
function QuestionSubmit({data,index}) {
    return (
        <div className="question-body bg-light border border-secoundary border-2 rounded-3 p-4 mb-3">
            <div className="title d-flex align-items-center gap-2 mb-2" style={{fontSize:"20px"}}>
                <h4>{index +1}-</h4>
                <h4>{data.questionText}</h4>
            </div>
            <div className="d-flex flex-column align-items-start justify-content-between w-100">
                <div className="block d-flex align-items-center gap-2">
                    <input type="radio" name={`answer${index}`} value={data.A}/>
                    <label htmlFor={data.A}>{data.A}</label>
                </div>
                <div className="block d-flex align-items-center gap-2">
                    <input type="radio" name={`answer${index}`} value={data.B}/>
                    <label htmlFor={data.B}>{data.B}</label>
                </div>
                <div className="block d-flex align-items-center gap-2">
                    <input type="radio" name={`answer${index}`} value={data.C}/>
                    <label htmlFor={data.C}>{data.C}</label>
                </div>
                <div className="block d-flex align-items-center gap-2">
                    <input type="radio" name={`answer${index}`} value={data.D}/>
                    <label htmlFor={data.D}>{data.D}</label>
                </div>
            </div>
        </div>
    )
}

export default QuestionSubmit;