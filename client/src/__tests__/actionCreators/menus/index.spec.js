import { expect } from 'chai';
import moxios from 'moxios';
import { FetchCatalogue } from '../../../actions/menus/';
import store from '../../../../store';

/* eslint no-unused-expressions: 0 */
let data;

describe('Menus action creators', () => {
  beforeEach(() => { moxios.install(); });
  afterEach(() => { moxios.uninstall(); });

  it('Should successfully fetch the catalogue from the Server', async () => {
    try {
      data = [{ name: 'Afang soup' }];
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({ status: 200, response: { data } });
      });
      await store.dispatch(FetchCatalogue());
      expect(store.getState().menus.catalog[0].name).to.equal('Afang Soup');
    } catch (err) {
      expect(err).to.not.exist;
    }
  });
});
