import Question from './Question';
import Header from './Header';
import ExamsList from './ExamsList';

export default function Home(){
    return (
        <div className='h-100' style={{background:"linear-gradient(135deg, #243b55 0%, #141e30 100%)"}}>
            <Header/>
            <ExamsList/>
        </div>
)}