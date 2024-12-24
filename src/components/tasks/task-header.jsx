import { Button } from "antd";
import { useDispatch } from "react-redux";
import { modalOpen } from "../../store/slices/modal-slice";

const TaskHeader = () => {
    const dispatch = useDispatch();
    
    return (
        <div className="flex items-center justify-between w-full mb-5">
            <div className="text-3xl font-semibold ml-5">
                Your Tasks List
            </div>
            <Button type="primary" onClick={() => dispatch(modalOpen({ type: "createTask" }))}>
                New task
            </Button>
        </div>
    );
}

export default TaskHeader;