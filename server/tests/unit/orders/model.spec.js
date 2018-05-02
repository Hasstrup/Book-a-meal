import { expect } from 'chai';
import OrderModel from '../../../models/v1/orders';

let data;
describe('Orders model', () => {
  it('should have the following properties', () => {
    expect(OrderModel.data).to.be.an('object');
    expect(OrderModel.keys).to.be.an('object');
  });

  it('_populate content should return the populated items in the order', () => {
    const mock = { content: { items: [1, 3, 4], processed: true, } };
    data = OrderModel._populateContent(mock);
    expect(data.content.items[0]).to.be.an('object');
    expect(data.content.items[1]).to.be.an('object');
    expect(data.content.items[0].name).to.equal('Fried Rice and Menu');
    expect(data.content.items[1].name).to.equal('Fried Rice and Menu & what not');
  });
});
