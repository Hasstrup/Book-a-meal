import { expect } from 'chai';
import OrderService from '../../../services/orders/';

let data;
let target;
let source;

describe('Order service object', () => {
  it(' The fetch all method should return the details for the kitchen', async () => {
    data = await OrderService.fetchAll('user', 2);
    expect(data).to.be.an('array');
    expect(data[0].content['1'].items[0].name).to.equal('Fried Rice and Menu & what not');
  });

  it('The fetch all method for kitchens should return the kitchen orders', async () => {
    data = await OrderService.fetchAll('kitchen', 1);
    expect(data).to.be.an('array');
    expect(data[0]).to.be.an('object');
  });

  it('should update one should only update the processed part of the order owned by the kitchen', async () => {
    data = await OrderService.updateOne('id', 1, 2);
    expect(data.content['2'].processed).to.be.true
  });

  it('create method should return the valid data fail case', async () => {
    try {
      target = { client: 2, content: { items: [2, 4, 5], processed: true } };
      await OrderService.create(target);
    } catch (e) {
      expect(e).to.exist;
    }
  });

  it('create method should return the valid object', async () => {
    target = { client: 1, content: { 1: { items: [0, 1, 2], processed: false } } };
    data = await OrderService.create(1, target);
    expect(data.content).to.be.an('object');
    expect(data.id).to.equal(4);
  });
});
