import { expect } from 'chai';
import Kitchen from '../../../models/v1/kitchen';

describe('Kitchen model', () => {
  it('should have the following properties',() => {
    expect(Kitchen.keys).to.be.an('object');
    expect(Kitchen.masterKey).to.be.an('object');
    expect(Kitchen.data).to.be.an('object');
    expect(Kitchen.data[1].name).to.be.equal('Yet another smaple kitchen');
  });
})
