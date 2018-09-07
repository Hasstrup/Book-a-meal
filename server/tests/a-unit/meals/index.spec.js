import { expect } from 'chai';
import MealService from '../../../services/meals';
import models from '../../../models/v2/relationship';


let valid;
let data;
let testkitchen;
let target;

const { Kitchen, User } = models;

describe('Meal service Object', () => {
  before(async () => {
    data = await User.findAll();
    target = data[0];
    testkitchen = await Kitchen.create({ name: 'Bay and Ruts', description: 'A really expensive restaurant on the island', userId: target.id });
  });
  it('Create method should return the valid created meal', async () => {
    valid = { name: 'This is a pretty awesome meal', description: 'This is an awesome meal, how nice', price: 2000 };
    data = await MealService.create(1, valid);
    expect(data.name).to.equal('This is a pretty awesome meal');
    expect(data.description).to.equal('This is an awesome meal, how nice');
  });

  it('Read method should fetch the particular meal option', () => {
    data = MealService.fetchOne('id', 11);
    expect(data).to.be.an('object');
    expect(data.name).to.equal('Fried Rice and Menu and whoop');
  });

  it('Delete method should delete a certain object in the data array', async () => {
    await MealService.deleteOne('id', 11);
    expect(MealService.fetchOne('id', 11)).to.be.null;
  });

  it('Update method should delete a certain object in the data', async () => {
    data = await MealService.updateOne('id', 12, { name: 'Hello sexyy Hasstrup'});
    expect(data.name).to.equal('Hello sexyy Hasstrup');
  });

  it('__create should create the method and persist to the database', async () => {
    data = await MealService.__create(testkitchen.id, valid);
    expect(data).to.have.property('name');
    expect(data.name).to.equal('This is a pretty awesome meal');
  });

});
