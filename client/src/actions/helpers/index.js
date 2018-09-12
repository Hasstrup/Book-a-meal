import axios from 'axios';
import { DispatchNotification, EndProcess } from '../../actionTypes/misc';

const { localStorage } = window;

export const wrapInTryCatch = async (func) => {
  try {
    return await func;
  } catch (err) {
    return { error: true, message: err.message };
  }
};

export const CacheHandler = () => ({
  setContent: (item, name) => {
    localStorage && localStorage.setItem(name, JSON.stringify(item));
  },
  getContent: name => localStorage && localStorage.getItem(name)
});

/**
 *
 * @param {obj} requestBody The request
 */
export const RequestHandler = requestBody => successCallback => (dispatch) => {
  // you may want to filter the request as well:  TODO
  const token = CacheHandler().getContent('#token!!#$3');
  return axios
    .request({
      ...requestBody,
      headers: {
        Authorization: token && JSON.parse(token.toString()),
        'Cache-Control': 'no-cache'
      }
    })
    .then(response => successCallback(response.data.data))
    .catch((err) => {
      console.log(err);
      dispatch(EndProcess());
      if (err.response) return dispatch(DispatchNotification(err.response.data.error));
      return dispatch(DispatchNotification('Sorry, that didnt go through'));
    });
};
