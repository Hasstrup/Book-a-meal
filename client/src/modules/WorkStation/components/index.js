import RenderMeals from './meals';
import RenderOrdersComponent from './orders';
import UserBio from './UserBio';
import { WorkStation as WorkStationMain } from './workstation-main';
import { MenuOfTheDayContainer as MenuOfTheDay } from './workstation-main/modules/MenuOfTheDay';


export const ComponentList =
[
  RenderMeals,
  RenderOrdersComponent,
  UserBio,
  WorkStationMain,
  MenuOfTheDay
];

export const PropList = [
  { handleSubmit: () => {}, meals: [] },
  {},
  {
    user: { firstname: '', email: '', bio: '' },
    handleChange: () => {},
    handleSubmit: () => {}
  },
  {
    kitchen: { name: '', description: '', bio: '' },
    meals: [],
    handleSubmit: () => {}
  },
  {
    dispatch: () => {},
    ofTheDay: { name: '', meals: [], description: '' },
    meals: []
  }

];
export const NameList = [
  'RenderMeals',
  'RenderOrdersComponent',
  'User Bio',
  'WorkStation Main',
  'MenuOfTheDayContainer'
];

