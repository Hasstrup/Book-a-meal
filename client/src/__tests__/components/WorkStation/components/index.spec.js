import TestComponent from '../../../TestComponents';
import { ComponentList, PropList, NameList } from '../../../../modules/WorkStation/components';

(async () => {
  await TestComponent(ComponentList, NameList, PropList, 'WorkStation Components');
})();