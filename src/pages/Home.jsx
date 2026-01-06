import ExamsList from '../components/ExamsList';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContenet';
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