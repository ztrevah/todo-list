import { Tag } from "antd";

const TaskLabel = (props) => {
    if(props?.label === "important") {
        return (
            <Tag color="red">Important</Tag>
        );
    }
    if(props?.label === "urgent") {
        return (
            <Tag color="yellow">Urgent</Tag>
        );
    }
    return "";
}

export default TaskLabel;