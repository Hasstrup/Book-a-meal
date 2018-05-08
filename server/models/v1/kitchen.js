import DataHandler from '../../databases/handler';
import kitchens from '../../databases/data/kitchens';

/* eslint global-require: 0, class-methods-use-this: 0 */
class KitchenModel extends DataHandler {


}

const Kitchen = new KitchenModel({
  name: String,
  caterer: { refs: 'Users' },
  meals: [{ refs: 'Users' }],
  ofTheDay: { refs: 'Menu' },
  subscribers: [{ refs: 'Users' }],
  description: String,
  image: String,
  id: String
}, [
  'name',
  'description'
]);

const data = Object.values(kitchens);
data.forEach(async (kitchen) => {
  await Kitchen.create(kitchen);
});


Kitchen.setMasterKey({ type: String, key: 'uuid' });

export default Kitchen;
