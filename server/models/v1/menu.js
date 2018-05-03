import DataHandler from '../../databases/handler';
import menus from '../../databases/data/menu';

class MenuModelBase extends DataHandler {

}

const MenuModel = new DataHandler({
  name: String,
  owner: { refs: 'Kitchens' },
  mealOptions: [{ refs: 'Meals' }],
  image: String,
  description: String,
}, [
  'name',
  'description'
]);

MenuModel.setMasterKey({ key: 'mmid', type: Number });

Object.values(menus).forEach(async (menu) => {
  await MenuModel.create(menu);
});

export default MenuModel;
