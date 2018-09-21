import AuthComponent from './auth';
import BannerComponent from './banner';
import FloatingComponent from './floater';

export const ComponentList = [AuthComponent, BannerComponent, FloatingComponent];
export const PropList = [{ logInUser: () => {}, createUser: () => {} }, {}, {}];
export const NameList = ['Auth Component', 'Banner Component', 'Floating Component'];