import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContenet';
import ExamResults from './ExamResults';
export default function Results(){
    return (
        <div className='h-100'>
            <Header title={"Exam Content"}/>
            <Sidebar/>
            <MainContent>
                <ExamResults/>
            </MainContent>
        </div>
)}