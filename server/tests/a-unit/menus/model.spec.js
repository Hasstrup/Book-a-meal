import { expect } from 'chai';
import MenuModel from '../../../models/v1/menu';

describe('Menu model', () => {
  it('should contain the following properties', () => {
    expect(MenuModel.data).to.be.an('object');
    expect(MenuModel.data[5].name).to.equal('Fried rice and Five fish');
    expect(MenuModel.masterKey.key).to.equal('mmid');
  })
})
