import { expect } from 'chai';
import models from '../../../models/v2/relationship';
import { validmenu } from '../factories/'

const { Menu, Kitchen } = models;
let data;
let source;
let res;

/* eslint no-return-await: 0, no-unused-expressions: 0 */
describe(' Menu model postgres', () => {
  describe('Create functions', () => {
    before(async () => await Menu.sync({ force: true }));

    it('should create a valid menu in the database', async () => {
      try {
        source = await Kitchen.findAll();
        data = { ...validmenu, KitchenId: source[0].id };
        res = await Menu.create(data);
        expect(res).to.exist;
        expect(res.name).to.equal('This is pretty awesome menu');
      } catch (e) {
        expect(e).to.not.exist;
      }
    });

    it('Should throw an error with null or missing KitchenId key', async () => {
      try {
        return await Menu.create(validmenu);
      } catch (e) {
        expect(e).to.exist;
      }
    });
  });
});
