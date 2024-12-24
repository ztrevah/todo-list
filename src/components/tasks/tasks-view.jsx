import TaskHeader from "./task-header";
import TaskTable from "./task-table"

const TaskView = () => {
    return (
        <div className="flex flex-col items-center w-full p-4">
            <TaskHeader />  
            <TaskTable />
        </div>
    );
}

export default TaskView;