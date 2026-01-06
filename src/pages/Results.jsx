import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContenet';
import ExamResults from '../components/ExamResults';
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