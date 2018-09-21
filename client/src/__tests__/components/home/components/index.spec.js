import TestComponent from '../../../TestComponents';
import { ComponentList, PropList, NameList } from '../../../../modules/home/components';

(async () => {
  await TestComponent(ComponentList, NameList, PropList, 'Home Components');
})();
