import { expect } from 'chai';
import UserService from '../../../services/users/';

describe('User service object', () => {
  it('Get all users, should return all the content in the models store', () => {
    const data = UserService.fetchAll();
    expect(data).to.be.an('array');
    expect(data[0].username).to.equal('hasstrupezekiel123');
  });

  it('Get a particular user when fed a query', () => {
    const data = UserService.fetchSingle('id', 4);
    expect(data.username).to.equal('beyhouston');
    expect(data.kitchen).to.equal(5);
  });

  it('updateSingle should update the particuler user', async () => {
    try {
      const changes = { username: 'ohmydearariana' };
      const data = await UserService.updateOne('id', 4, changes);
      expect(data.username).to.equal('ohmydearariana');
    } catch (e) {
      expect(e).to.not.exist;
    }
  });

  it('should delete the select item', async () => {
    try {
      return await UserService.deleteOne('id', 5);
    } catch (e) {
      expect(e).to.not.exist;
    }
  });

});
