import CurrentOrder from './CurrentOrder';
import OrderHistoryGrid from './OrderHistoryGrid';
import { OrderHistoryComponent as RenderMainHistory } from './RenderMainHistory';

export const ComponentList = [
  CurrentOrder,
  OrderHistoryGrid,
  RenderMainHistory
];

export const PropList = [
  { meals: [], history: () => {} },
  { orders: [], title: '' },
  { orders: [] }
];

export const NameList = [
  'Current Order',
  'OrderHistoryGrid',
  'RenderMainHistory'
];
