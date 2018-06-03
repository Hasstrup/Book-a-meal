import axios from 'axios'

const url = 'http://localhost:3900/api/v1'

const axiosInstance = (header) => {
  if (!header) return axios.create({ baseUrl: url });
  return axios.create({ baseUrl: url, headers: { Authorization: header } });
};

export const wrapInTryCatch = async (func) => {
  try {
    return await func();
  } catch (e) {
    return { error: true, message: e.message }
  }
};
export default axiosInstance
