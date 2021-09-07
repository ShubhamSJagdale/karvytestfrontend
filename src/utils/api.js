import axios from "axios";

const api = async ({ method = "GET", path, data = {}, headers = {} }) => {
  const basePath = "http://localhost:8080/api";
  var config = {
    method,
    headers: {
      ...headers,
    },
    url: `${basePath}${path}`,
    data: data,
  };

  return axios(config);
};

export default api;
