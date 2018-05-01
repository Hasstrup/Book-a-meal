import { expect } from 'chai';
import MenuServiceObject from '../../../services/menu';

let data;
let target;

describe('Menu Service Object', () => {

  it('Get All should return all the menus in the mock store', async () => {
    data = await MenuServiceObject.fetchAll();
    expect(data[0]).to.be.an('object');
    expect(data[0].name).to.be.equal('Fried rice and fish');
  });
  /* eslint no-unused-expressions: 0 */
  it('Get One should return a kitchen specifically', () => {
    data = MenuServiceObject.fetchOne('id', 4);
    expect(data.owner).to.equal(4);
    expect(data.mealOptions).to.include(4);
  });

  it('updateone should update the details of a kitchen', async () => {
    data = await MenuServiceObject.updateOne('owner', 7, {name: 'Otse CookSpot'});
    expect(data.name).to.equal('Otse CookSpot');
  });

  it('deleteOne should delete specfied object', () => {
    MenuServiceObject.deleteOne('owner', 9);
    expect(MenuServiceObject.fetchOne('owner', 9)).to.be.null;
  });

  it('getCatalogue should return an array of menus of the day', () => {
    data = MenuServiceObject.fetchCatalogue();
    expect(data).to.be.an('array');
    expect(data[0]).to.be.an('object');
  });

  it('create a menu should return the menu with the valid input', async () => {
    data = { name: 'This is Hasstrups kitchen', description: 'This is actually an awesome meal'}
    target = await MenuServiceObject.create(5, data);
    expect(target).to.be.an('object');
    expect(target.name).to.equal('This is Hasstrups kitchen');
    expect(target.owner).to.equal(5);
  });
});
