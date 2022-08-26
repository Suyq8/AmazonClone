import { selector } from 'recoil';
import { cartStateAtom } from '../recoil/cartAtom';

export const totalItem = selector({
  key: 'totalItem',
  get: ({ get }) => {
    const cart = get(cartStateAtom);
    const totalItems = cart.reduce((total, { quantity }) => total + (quantity), 0);

    return totalItems
  }
})

export const totalPrice = selector({
  key: 'totalPrice',
  get: ({ get }) => {
    const cart = get(cartStateAtom);
    const totalPrice = cart.reduce((total, { quantity, price, order }) => total + (quantity * price * order), 0);

    return totalPrice
  }
})

export const selectItem = selector({
  key: 'selectItem',
  get: ({ get }) => {
    const cart = get(cartStateAtom);
    const totalItems = cart.reduce((total, { quantity, order }) => total + (quantity*order), 0);

    return totalItems
  }
})