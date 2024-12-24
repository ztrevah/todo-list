import { Calendar, Divider } from "antd";
import CalendarHeader from "./calendar-header";
import CalendarDateDetail from "./calendar-date-detail";
import { useState } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const CalendarView = () => {
    const { data: currentUser } = useSelector(state => state.user);
    const tasks = currentUser?.tasks;
    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
    const onSelectDate = (date) => {
        setSelectedDate(date.format('YYYY-MM-DD'));
    }
    const hasTaskDays = {};
    tasks?.forEach((task) => {
        hasTaskDays[dayjs.unix(task.due_date).format('YYYY-MM-DD')] = true;
    });
    
    return (
        <div className="w-[500px] p-5">
            <CalendarHeader />
            <Calendar 
                fullscreen={false} 
                onSelect={onSelectDate} 
                mode="month"
                cellRender={(value) => {
                    if(hasTaskDays[value.format('YYYY-MM-DD')])
                        return <div className="h-[2px] bg-[#1677ff] mt-[2px]"></div>
                    else return "";
                }}
            />
            <Divider />
            <CalendarDateDetail selectedDate={selectedDate} tasks={tasks} />
            
        </div>
    );
}

export default CalendarView;