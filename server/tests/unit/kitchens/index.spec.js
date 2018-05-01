import { expect } from 'chai';
import KitchenService from '../../../services/kitchens';

let data;

describe('Kitchen Service Object', () => {
  it('Get All should return all the kitchens in the mock store', async () => {
    data = await KitchenService.fetchAll();
    expect(data[0]).to.be.an('object');
    expect(data[0].name).to.be.equal('Yet another smaple kitchen');
  });
  /* eslint no-unused-expressions: 0 */
  it('Get One should return a kitchen specifically', () => {
    data = KitchenService.fetchOne('id', 1);
    expect(data.caterer).to.equal(1);
    expect(data.meals).to.include(4);
  });

  it('get Subscribers should return the subscribers of a kitchen', () => {
    data = KitchenService.getSubscribers('caterer', 5);
    expect(data).to.be.an('array');
    expect(data[0]).to.be.an('object');
    expect(data[0].firstname).to.equal('Nervous');
  });

  it('fetch Orders should return the orders contaiing the kitchen', async () => {
    data = await KitchenService.fetchOrders('caterer', 1);
    expect(data).to.be.an('array');
  });

  it('Get menus should return all the menus belonging to a user', () => {
    data = KitchenService.fetchMenus('caterer', 1);
    expect(data).to.be.an('array');
    expect(data[0].name).to.equal('Fried rice and fish');
  });

  it('updateone should update the details of a kitchen', async () => {
    data = await KitchenService.updateOne('caterer', 7, {name: 'Otse CookSpot'});
    expect(data.name).to.equal('Otse CookSpot');
  });

  it('deleteOne should delete specfied object', () => {
    KitchenService.deleteOne('caterer', 6);
    expect(KitchenService.fetchOne('caterer', 6)).to.be.null;
  });

  it('Set menu of the day should change the menu of the day', async () => {
    data = await KitchenService.setMenuOfTheDay('caterer', 7, {ofTheDay: 7});
    expect(data.ofTheDay).to.equal(7);
  });

});
