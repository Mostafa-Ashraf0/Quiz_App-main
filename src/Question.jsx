function Question({data,index}) {

    return (
        <>
            <h1>{index}</h1>
            <p>{data.questionText}</p>
            <select name="choose" id="choose">
                <option value={data.A}>{data.A}</option>
                <option value={data.B}>{data.B}</option>
                <option value={data.C}>{data.C}</option>
                <option value={data.D}>{data.D}</option>
            </select>
        </>
    )
}

export default Question;