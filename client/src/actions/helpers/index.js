import axios from 'axios';
import { SomethingWentWrong } from '../../actionTypes/misc';

export const wrapInTryCatch = async (func) => {
  try {
    return await func;
  } catch (err) {
    return { error: true, message: err.message };
  }
};

export const CacheHandler = () => ({
  setContent: (item, name) => {
    localStorage.setItem(name, JSON.stringify(item));
  },
  getContent: name => localStorage.getItem(name)
});

/**
 *
 * @param {obj} requestBody The request
 */
export const RequestHandler = requestBody => successCallback => (dispatch) => {
  // you may want to filter the request as well:  TODO
  axios
    .request({
      ...requestBody,
      headers: {
        Authorization: CacheHandler().getContent('#token!!#$3')
      }
    })
    .then(response => successCallback(response.data.data))
    .catch((err) => {
      if (err.response) return dispatch(SomethingWentWrong(err.response.message));
      return dispatch(SomethingWentWrong('Sorry, that didnt go through'));
    });
};
