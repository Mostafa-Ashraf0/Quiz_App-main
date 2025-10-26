import Header from './Header';
import Sidebar from './Sidebar';
import MainContent from './MainContenet';
import Exam from './Exam'
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