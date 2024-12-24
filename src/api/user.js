import request from "../utils/request";
import API_ENDPOINT from "../config/api_endpoint";

const getAll = () => {
  return request({
    url: API_ENDPOINT.USERS,
    method: 'GET',
  });
}

const post = (params) => {
  return request({
    url: API_ENDPOINT.USERS,
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export default {
  getAll,
  post,
};
