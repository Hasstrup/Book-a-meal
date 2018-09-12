
import _ from 'lodash/array';
/**
 * I expect this guy to add an item to the locsl storage;
 * it should create a serializable dictionary of keys -
 * like this {
 *  cfh-order-23*7937038938739: [
 *  meal object
 *
 *
 * ]
 * }
 */
 const { localStorage } = window;
const currentDate = new Date();
const CartOps = (key = generateKey()) => meal => ({ add, remove, clear }) => {
  let cart;
  meal = { ...meal, quantity: 1 };
  const addItemToCart = () => {
    if (!localStorage.getItem(key)) {
      cart = { meals: [meal] };
      localStorage.setItem(key, JSON.stringify(cart));
      return cart.meals;
    }
    cart = JSON.parse(localStorage.getItem(key));
    if (cart.meals.find(item => item.id === meal.id)) return cart.meals;
    cart.meals.push(meal); // to push or to unshift;
    localStorage.setItem(key, JSON.stringify(cart));
    return cart.meals;
  };

  const RemoveItemFromCart = () => {
    if (localStorage.getItem(key)) {
      cart = JSON.parse(localStorage.getItem(key));
      _.remove(cart.meals, n => n.id === meal.id);
      localStorage.setItem(key, JSON.stringify(cart));
      return cart.meals;
    }
    return [];
  };

  const ClearItemsFromCart = () => localStorage && localStorage.removeItem(key);

  const FetchAllItemsFromCart = () => localStorage.getItem(key) && JSON.parse(localStorage.getItem(key)).meals;


  if (add) return addItemToCart();
  if (remove) return RemoveItemFromCart();
  if(clear) return ClearItemsFromCart();
  return FetchAllItemsFromCart(); // the default thing will be to fetch items in cart
};

const generateKey = () => `bkm-order-dict-${currentDate.getDay()}${currentDate.getMonth()}${currentDate.getFullYear()}`;

export { CartOps, generateKey };
