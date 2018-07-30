import { RequestHandler } from '../helpers/';
import { DispatchNotification, StartProcess, EndProcess } from '../../actionTypes/misc';
import { TargetKitchenRetrieved } from '../../actionTypes/kitchens';
import config from '../../config';


const SetUpNewKitchen = data => (dispatch, getState) => {
  dispatch(StartProcess());
  if (!data.description || !data.name) return dispatch(DispatchNotification('Please pass in the correct name and description'));
  RequestHandler({ method: 'post', url: `${config.url}/kitchens`, data })((kitchen) => {
    document.getElementsByClassName('new-kitchen')[0].style.display = 'none';
    dispatch(EndProcess());
    dispatch(TargetKitchenRetrieved(kitchen));
    dispatch(DispatchNotification(`Awesome ${getState().users.currrent.firstname}!, now you can start sharing your meals`));
  });
};

export default { SetUpNewKitchen };
