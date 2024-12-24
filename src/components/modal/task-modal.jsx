import { Button, Checkbox, DatePicker, Form, Input, Modal, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { deleteTask, postTask, updateTask } from "../../services/task";
import { useDispatch, useSelector } from "react-redux";
import { modalClose } from "../../store/slices/modal-slice";
import { addTaskState, deleteTaskState, updateTaskState } from "../../store/slices/user-slice";


const TaskModal = () => {
    const dispatch = useDispatch();
    const modalState = useSelector(state => state?.modal);
    const { 
        data,
        type: modalType,
        isOpen
    } = modalState;
    const task = data?.task;

    
    const isModalOpen = (modalType === "createTask" || modalType === "editTask") && isOpen;
    const [isLoading, setIsLoading] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    useEffect(() => {
        setIsFinished(task?.finished);
    }, [task]);

    const formLayout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 20,
        },
    }

    const due_date = (task?.due_date) ? dayjs.unix(task?.due_date) : dayjs();
    const initialValues = {
        ...task,
        due_date,
    };

    const onSubmit = async (values) => {
        if(!values.due_date) values.due_date = null;
        else values.due_date = values.due_date.unix();
        if(!values.description) values.description = "";
        if(!values.labels) values.labels = [];
        if(modalType === "editTask") values.finished = isFinished;
        try {
            setIsLoading(true);
            if(modalType === "createTask") {
                const newTask = await postTask(values);
                dispatch(addTaskState({ task: newTask }));
            }
            else if(modalType === "editTask") {
                const updatedTask = await updateTask({ task_id: task?.id }, values);
                dispatch(updateTaskState({ task: updatedTask }));
            }
            dispatch(modalClose());
        } catch(err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }
    const onDelete = async () => {
        try {
            setIsLoading(true);
            const deletedTask = await deleteTask({ task_id: task?.id });
            dispatch(deleteTaskState({ task: deletedTask }));
            dispatch(modalClose());
        } catch(err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <Modal open={isModalOpen} footer={null} onCancel={() => dispatch(modalClose())} destroyOnClose>
            <div className="p-5">
                <div className="text-xl font-semibold text-center mb-5">
                    {modalType === "createTask" ? "Create a new task" : "Task detail"}
                </div>
                <Form
                    {...formLayout}
                    onFinish={onSubmit}
                    initialValues={initialValues}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Task title is required'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        label="Due date"
                        name="due_date"
                        rules={[
                            {
                                required: true,
                                message: 'Due date is required'
                            }
                        ]}
                    >
                        <DatePicker style={{width: '100%'}} />
                    </Form.Item>
                    <Form.Item
                        label="Labels"
                        name="labels"
                    >
                        <Select 
                            placeholder="Select task's priorities" 
                            allowClear
                            mode="multiple"
                            options={[
                                { value: 'urgent' },
                                { value: 'important' }
                            ]}
                        />
                    </Form.Item>
                    {modalType === "editTask" && (
                        <Form.Item
                            label="Finished"
                            name="finished"
                        >
                            <Checkbox checked={isFinished} onChange={e => setIsFinished(e.target.checked)} />
                        </Form.Item>
                    )}
                    {modalType === "createTask" && (
                        <div className="text-end">
                            <Button htmlType="submit" type="primary" loading={isLoading}>
                                Submit
                            </Button>
                        </div>
                    )}
                    {modalType === "editTask" && (
                        <div className="text-end">
                            <Button onClick={onDelete} type="primary" danger className="mr-3" loading={isLoading}>
                                Delete
                            </Button>
                            <Button htmlType="submit" type="primary" loading={isLoading}>
                                Save
                            </Button>
                        </div>
                    )}
                    
                    
                </Form>
            </div>
        </Modal>
    );  
}

export default TaskModal;