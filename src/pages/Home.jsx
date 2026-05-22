import ExamsList from '../components/ExamsList';
import Header from '../components/Header';
import SideBar from '../components/Sidebar';
import MainContent from '../components/MainContenet';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function Home() {
  return (
    <SidebarProvider
      style={{
        "--sidebar-background": "0 0% 0%",
        "--sidebar-foreground": "0 0% 98%",
      }}
    >
      <div className="flex h-screen">

        <SideBar />

        <div className="flex flex-col flex-1">

          <Header title="Dashboard" />

          <MainContent>
            <ExamsList />
          </MainContent>

        </div>

      </div>
    </SidebarProvider>
  );
}