import TaskView from "../components/tasks/tasks-view";
import CalendarView from "../components/calendar/calendar-view";
import { ModalProvider } from "../providers/modal-provider";
import { Header } from "../components/header/header";


const HomePage = () => {
  return (
    <div className="flex flex-col items-center w-full justify-between">
      <Header />
      <div className="flex p-5">
        <TaskView />
        <CalendarView />
        <ModalProvider />
      </div>
    </div>
      
  );
}
    
  
export default HomePage;