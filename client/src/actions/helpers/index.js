import axios from 'axios';

export const axiosInstance = () => axios.create({
  baseUrl: 'http://localhost:3900/api/v1',
  timeout: 1000
});

export const wrapInTryCatch = async (func) => {
  try {
    return await func;
  } catch (err) {
    return { error: true, message: err.message };
  }
};
