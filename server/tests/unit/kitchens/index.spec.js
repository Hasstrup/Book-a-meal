import { expect } from 'chai';
import KitchenService from '../../../services/kitchens';
import models from '../../../models/v2/relationship';

const { Kitchen, Menu } = models;

let source;
let test;
let data;
let testMenu;

describe('Kitchen Service Object', () => {
  before(async () => {
    source = await Kitchen.findAll();
    test = source[0];
    data = await Menu.findAll();
    testMenu = data[0]
  })
  it('Get All should return all the kitchens in the mock store', async () => {
    data = await KitchenService.fetchAll();
    expect(data[0]).to.be.an('object');
    expect(data[0].name).to.be.equal('This is Hasstrups test kitchen');
  });
  /* eslint no-unused-expressions: 0 */
  it('Get One should return a kitchen specifically', async () => {
    data = await KitchenService.fetchOne('id', data[0].id);
    expect(data.UserId).to.exist;
  });

  // it('get Subscribers should return the subscribers of a kitchen', () => {
  //   data = KitchenService.getSubscribers('id', test.id);
  //   expect(data).to.be.an('array');
  //   expect(data[0]).to.be.an('object');
  //   expect(data[0].firstname).to.equal('Nervous');
  // });

  it('fetch Orders should return the orders contaiing the kitchen', async () => {
    data = await KitchenService.fetchOrders('id', test.id);
    expect(data).to.be.an('array');
  });

  it('Get menus should return all the menus belonging to a user', async () => {
    data = await KitchenService.fetchMenus('id', test.id);
    expect(data).to.be.an('array');
  });

  it('updateone should update the details of a kitchen', async () => {
    data = await KitchenService.updateOne('id', test.id, { name: 'Otse CookSpot'});
    expect(data.name).to.equal('Otse CookSpot');
  });


  it('Set menu of the day should change the menu of the day', async () => {
    data = await KitchenService.__setMenuOfTheDay('id', test.id, testMenu.get({ plain: true }) );
    expect(data.id).to.be.a('string');
  });

  it('deleteOne should delete specfied object', async () => {
    await KitchenService.deleteOne('id', test.id);
    expect(await KitchenService.fetchOne('id', test.id)).to.be.null;
  });

});
