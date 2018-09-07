import { expect } from 'chai';
import KitchenService from '../../../services/kitchens';
import models from '../../../models/v2/relationship';
import { validKitchen, validmenu, validuser } from '../factories';

const { Kitchen, Menu, User } = models;

let source;
let test;
let data;
let testMenu;

describe('Kitchen Service Object', () => {
  before(async () => {
    await User.create(validuser());
    const user = await User.findAll({ limit: 1 });
    await Kitchen.create({ ...validKitchen, userId: user[0].id });
    source = await Kitchen.findAll();
    test = source[0];
    await Menu.create({ ...validmenu, kitchenId: test.id });
    data = await Menu.findAll();
    testMenu = data[0];
  });
  it('Get All should return all the kitchens in the mainstore', async () => {
    data = await KitchenService.fetchAll();
    expect(data[0]).to.be.an('object');
  });
  /* eslint no-unused-expressions: 0 */
  it('Get One should return a kitchen specifically', async () => {
    data = await KitchenService.fetchOne('id', data[0].id);
    expect(data.userId).to.exist;
  });


  it('fetch Orders should return the orders of the kitchen', async () => {
    data = await KitchenService.__fetchOrders('id', test.id)();
    expect(data).to.be.an('array');
    expect(Object.keys(data[0].status).includes(test.id)).to.be.true;
  });

  it('Get menus should return all the menus belonging to a user', async () => {
    data = await KitchenService.__fetchMenus('id', test.id);
    expect(data).to.be.an('array');
    expect(data[0].kitchenId).to.equal(test.id);
  });

  it('updateone should update the details of a kitchen', async () => {
    data = await KitchenService.__updateOne('id', test.id, { name: 'Otse CookSpot' });
    expect(data.name).to.equal('Otse CookSpot');
  });


  it('Set menu of the day should change the menu of the day', async () => {
    data = await KitchenService.__setMenuOfTheDay('id', test.id, testMenu.get({ plain: true }));
    expect(data.id).to.be.a('string');
  });
});
