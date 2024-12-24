const API_URL = process.env.REACT_APP_API_URL;

export default {
  USERS: `${API_URL}/users`,
  USER: `${API_URL}/users/:user_id`,
  TASKS: `${API_URL}/users/:user_id/tasks`,
  TASK: `${API_URL}/users/:user_id/tasks/:task_id`,
}
