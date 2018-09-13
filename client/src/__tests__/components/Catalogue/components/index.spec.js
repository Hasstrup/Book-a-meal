import TestComponent from '../../../TestComponents';
import { ComponentList, PropList, NameList } from '../../../../modules/catalogue/components';

(async () => {
  await TestComponent(ComponentList, NameList, PropList, 'Catalogue Components');
})();