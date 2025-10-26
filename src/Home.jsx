import Question from './Question';
import Header from './Header';
import ExamsList from './ExamsList';
import Sidebar from './Sidebar';
import MainContent from './MainContenet';
export default function Home(){
    return (
        <div className='h-100'>
            <Header title={"Dashboard"}/>
            <Sidebar/>
            <MainContent>
                <ExamsList/>
            </MainContent>
        </div>
)}