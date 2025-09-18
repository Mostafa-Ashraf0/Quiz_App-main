

function Question({ id, question, options,setSelected,selected}) {
    return (
        <>
            <h2>Question{id}</h2>
            <p>{question}</p>
                    {options.map((option, index) => (
                    <div key={`{id}{index}`} className="option">
                        <input type="checkbox" 
                    id={`q${id}_option${index}`}
                    value={option} 
                    name={option}
                    checked={selected.find((item) => item.id === id)?.option === option}
                    onChange={() =>{
                        setSelected((prevSelected) => {
                            const existing = prevSelected.find((item) => item.id === id);

                            if (existing) {
                                if (existing.option === option) {
                                    return prevSelected.map((item) =>
                                        item.id === id ? { id:item.id , option: null } : item
                                    );
                                } else {
                                    return prevSelected.map((item) =>
                                        item.id === id ? { id:item.id, option: option } : item
                                    );
                                }
                            } else {
                                return [...prevSelected, { id, option }];
                            }
                        });
                    }}
                    />
                    <label htmlFor={`q${id}_option${index}`}>{option}</label>
                    </div>
                ))}
        </>
    )
}

export default Question;