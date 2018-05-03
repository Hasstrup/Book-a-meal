import DataHandler from '../../databases/handler';
import users from '../../databases/data/users';

export class UserModel extends DataHandler {
  /* eslint global-require: 0 */
  /* eslint class-methods-use-this: 0 */
  getOrders(node) {
    const dataSource = require('../../databases/data/orders');
    const data = Object.values(dataSource);
    const target = data.filter(item => item.client === node.id);
    return target;
  }
}

const User = new UserModel(
  {
    username: String,
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    kitchen: { refs: 'Kitchens' },
    orders: [{ refs: 'Orders' }],
    phone: Number,
    created: Date
  },
  [
    'username',
    'email',
    'password',
    'firstname'
  ],
);

// Load some data into the store;
Object.values(users).forEach(async (user) => {
  await User.create(user);
});

User.setMasterKey({ key: 'uuid', type: Number });
export default User;
