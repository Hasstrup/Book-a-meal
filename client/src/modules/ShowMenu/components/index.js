import ShowMeal from './ShowMeal';
import ShowMenuDetails from './ShowMenuDetails';
import VendorDetails from './VendorDetails';

export const ComponentList = [ShowMeal, ShowMenuDetails, VendorDetails];
export const PropList = [{}, { meals: [] }, { menu: { meals: [], description: '', name: '', kitchen: { image: '', name: '', description: '' }}}];
export const NameList = ['Show Meal', 'ShowMenuDetails', 'VendorDetails'];

