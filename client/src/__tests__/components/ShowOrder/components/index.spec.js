import TestComponent from '../../../TestComponents';
import { ComponentList, PropList, NameList } from '../../../../modules/ShowOrders/components';

(async () => {
  await TestComponent(ComponentList, NameList, PropList, 'Show Orders Components');
})();