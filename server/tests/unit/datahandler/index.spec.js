import { expect } from 'chai'
import DataHandler from '../../../databases/handler';


describe('DatahHandler Class constructor', () => {
  it('should have attrubutes data,keys, init data', () => {
    const dataParser = new DataHandler;
    expect(dataParser.data).to.exist;
    expect(dataParser.keys).to.exist;
    expect(dataParser.keys).to.be.an('object');
    expect(dataParser.initData).to.be.an('object');
  });
});
