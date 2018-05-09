import { expect } from 'chai';
import UserService from '../../../services/users/';
import Encrypt from '../../../helpers/encrypt/'

let data;
let token;

describe('User service object', () => {
  it('Get all users, should return all the content in the models store', () => {
    const data = UserService.fetchAll();
    expect(data).to.be.an('array');
    expect(data[0].username).to.equal('hasstrupezekiel123');
  });

  it('Get a particular user when fed a query', () => {
    const data = UserService.fetchSingle('id', 5);
    expect(data.username).to.equal('beyhouston');
    expect(data.kitchen).to.equal(5);
  });
  /* eslint no-unused-expressions: 0 */
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

  describe(' Extra methods - reset password and confirm email', () => {
    before(async () => {
      data = await UserService.__model.findAll();
      data = data[0];
    });
    it('__resetPassword should reset the password of a user on first try and fail done again', async () => {
      try {
        token = await Encrypt.issueToken({ id: data.id, resetPasswordCount: data.resetPasswordCount });
        data = await UserService.__resetPassword(token);
        expect(data.resetPasswordCount).to.equal(1);
        await UserService.__resetPassword(token);
      } catch (e) {
        expect(e).to.exist;
        expect(e.message).to.equal('Sorry this token is expired');
      }
    });

    it('__confirmEmail should confirm the email of the test user and invalidate after', async () => {
      try {
        data = await UserService.__confirmEmail(token);
        expect(data.confirmedEmail).to.be.true;
        await UserService.__confirmEmail(token);
      } catch (e) {
        expect(e).to.exist;
        expect(e.message).to.equal('Seems like youve confirmed your email prior to now');
      }
    });
  });
});
