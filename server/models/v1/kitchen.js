import DataHandler from '../../databases/handler';
import kitchens from '../../databases/data/kitchens'

class KitchenModel extends DataHandler {

}

const Kitchen = new KitchenModel({
  name: String,
  owner: { refs: 'Users' },
  meals: [{ refs: 'Meals' }],
  ofTheDay: { refs: 'Menu' },
  subscribers: [{ refs: 'Users' }],
  description: String,
  image: String
}, [
  'name',
  'owner',
  'description'
]);

Object.values(kitchens).forEach(async (kitchen) => {
  await Kitchen.create(kitchen);
});

Kitchen.setMasterKey({ type: String, key: 'uuid' });

export default Kitchen;
