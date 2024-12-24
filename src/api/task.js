import request from "../utils/request";
import API_ENDPOINT from "../config/api_endpoint";


const getAll = async () => {
  return request({
    url: API_ENDPOINT.TASKS,
    method: 'GET',
  })
}

const post = async (params) => {
  return request({
    url: API_ENDPOINT.TASKS,
    method: 'POST',
    data: {
      ...params,
    },
  });
}

const get = async (task_id) => {
  return request({
    url: API_ENDPOINT.TASK.replace(":task_id",task_id),
    method: 'GET',
  });
}

const put = async (task_id, params = {}) => {
  return request({
    url: API_ENDPOINT.TASK.replace(":task_id",task_id),
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

const del = async (task_id) => {
  return request({
    url: API_ENDPOINT.TASK.replace(":task_id",task_id),
    method: 'DELETE',
  });
}


export default {
  getAll,
  get,
  post,
  put,
  del
};
