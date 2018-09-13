import TestComponent from '../../../TestComponents';
import { ComponentList, PropList, NameList } from '../../../../modules/ShowMenu/components';

(async () => {
  await TestComponent(ComponentList, NameList, PropList, 'Show Menu Components');
})();