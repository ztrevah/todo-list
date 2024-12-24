import { Table } from 'antd';
import TaskLabel from './task-label';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { modalOpen } from '../../store/slices/modal-slice';


const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title'
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        ellipsis: true
    },
    {
        title: 'Due date',
        dataIndex: 'due_date',
        key: 'due_date',
        render: (due_date) => {
            return dayjs.unix(due_date).format('YYYY-MM-DD');
        },
        sorter: (a,b) => a.due_date > b.due_date,
    },
    {
        title: 'Labels',
        dataIndex: 'labels',
        key: 'labels',
        render: (tags) => (
            <>
            {tags?.map((tag,index) => (
                <TaskLabel label={tag} key={index} />
            ))}
            </>
        )
    },
    {
        title: 'Finished',
        dataIndex: 'finished',
        key: 'finished',
        render: (isFinished) => {            
            if(isFinished) 
                return <span className="text-green-400 pointer-events-none">Finished</span>;
            else 
                return <span className="text-rose-500 pointer-events-none">Not Finished</span>;
        },
        sorter: (a,b) => b.finished - a.finished,
        
    }
]
const TaskTable = (props) => {
    const dispatch = useDispatch();
    const {
        data: currentUser 
    } = useSelector(state => state.user);
    const dataSource = currentUser?.tasks?.toSorted((a,b) => {
        return a.finished - b.finished;
    });
    
    return (
        <>
            <Table 
                dataSource={dataSource} 
                columns={columns}
                onRow={(task) => ({
                    onClick: () => {
                        dispatch(modalOpen({ type: "editTask", data: { task } }))
                    }
                })}
                rowKey={task => task.id}
            >
                
            </Table>
        </>
    )
}

export default TaskTable;