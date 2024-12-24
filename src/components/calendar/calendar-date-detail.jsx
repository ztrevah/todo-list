import { Badge } from "antd";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { modalOpen } from "../../store/slices/modal-slice";

const CalendarDateDetail = (props) => {
    const dispatch = useDispatch();
    const selectedDate = props?.selectedDate;
    const tasks = props?.tasks?.filter((task) => {
        return dayjs.unix(task.due_date).format('YYYY-MM-DD') === selectedDate;
    });
    const todayDate = dayjs().format('YYYY-MM-DD');
    return (
        <div className="overflow-auto max-h-[300px] p-2 [&::-webkit-scrollbar]:w-1
                        [&::-webkit-scrollbar-track]:rounded-full
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-gray-300">
            <div className="text-xl text-center mb-4">
                {selectedDate === todayDate ? "Today": dayjs(selectedDate).format('MMMM D')}
            </div>
            {tasks?.map((task, index) => {
                return (
                    <div 
                        className="flex flex-col items-start mb-2 rounded bg-zinc-100 p-3 cursor-pointer" 
                        key={index} 
                        onClick={() => dispatch(modalOpen({ type: "editTask", data: { task } }))}
                    >
                        <div className="text-sm">
                            {task.finished ? 
                                <Badge status="success"/>
                                :
                                <Badge status="error" />
                            }
                            <span className="ml-1">{task.title}</span>
                        </div>
                        <div className="text-xs text-zinc-500 ml-3 text-ellipsis line-clamp-2">{task.description}</div>
                    </div>
                )
            })}
        </div>
    );
}

export default CalendarDateDetail;