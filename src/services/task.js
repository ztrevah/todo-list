import taskService from "../api/task";

export const getAllTasks = async () => {
  try {
    const res = await taskService.getAll();
    const tasks = res.data;
    if (Array.isArray(tasks)) return tasks;
    else return [];
  } catch (err) {
    return [];
  }
};

export const getTask = async (query) => {
  const { task_id } = query;
  try {
    const res = await taskService.get(task_id);
    return res.data;
  } catch (err) {
    return null;
  }
};

export const postTask = async (data) => {
  try {
    const res = await taskService.post(data);
    return res.data;
  } catch (err) {
    return null;
  }
};

export const updateTask = async (query, data) => {
  const { task_id } = query;
  try {
    const res = await taskService.put(task_id, data);
    return res.data;
  } catch (err) {
    return null;
  }
};
export const deleteTask = async (query) => {
  const { task_id } = query;
  try {
    const res = await taskService.del(task_id);
    return res.data;
  } catch (err) {
    return null;
  }
};
