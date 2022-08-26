import { atom } from 'recoil'

export const cartStateAtom = atom({
  key: 'cartState',
  default: []
});

export const productAtom = atom({
  key: 'product',
  default: []
});

export const addressAtom = atom({
  key: 'address',
  default: ''
});

export const stateAtom = atom({
  key: 'state',
  default: ''
});

export const countryAtom = atom({
  key: 'country',
  default: ''
});

export const zipAtom = atom({
  key: 'zip',
  default: ''
});

export const displayAtom = atom({
  key: 'display',
  default: false
});