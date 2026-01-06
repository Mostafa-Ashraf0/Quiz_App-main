import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContenet';
import Exam from '../components/Exam'
export default function Home(){
    return (
        <div className='h-100'>
            <Header title={"Exam Content"}/>
            <Sidebar/>
            <MainContent>
                <Exam/>
            </MainContent>
        </div>
)}