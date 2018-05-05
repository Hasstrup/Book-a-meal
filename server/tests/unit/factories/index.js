import faker from 'faker';

/**
  * User factory
  *@return {Object} An object to build for the user test;
  *@desc
*/
export const validuser = () => {
  return {
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

export const validKitchen = {
  name: 'Hasstrups Test Kitchen',
  description: 'Hasstrup really likes cool kitchen'
};

export const invalidKitchen = {
  name: 12,
  description: 123
}
