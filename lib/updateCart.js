import { useRecoilState } from 'recoil'
import { cartStateAtom } from '../recoil/cartAtom'

export function addProduct() {
  const [cart, setCart] = useRecoilState(cartStateAtom);

  return (item) => {
    const idx = cart.findIndex(cartItem => item.id === cartItem.id);

    if (idx === -1) {
      const newItem = { ...item, quantity: 1, order: true };
      setCart([...cart, newItem]);
    } else {
      const newCart = cart.map((item, i) => {
        if (i === idx) {
          return {
            ...item,
            quantity: item.quantity + 1,
          }
        }

        return item;
      })
      setCart(newCart);
    }
  }
}

export function removeProduct() {
  const [cart, setCart] = useRecoilState(cartStateAtom);

  return (id) => {
    const newCart = cart.filter(cartItem => cartItem.id !== id);

    setCart(newCart);
  }
}

export function setProductQty() {
  const [cart, setCart] = useRecoilState(cartStateAtom);
  const remove = removeProduct();

  return (id, quantity) => {
    if (quantity === 0) {
      remove(id);
      return;
    }

    const idx = cart.findIndex(cartItem => id === cartItem.id);
    const newCart = cart.map((item, i) => {
      if (i === idx) {
        return {
          ...item,
          quantity: quantity,
        }
      }
      return item;
    })
    setCart(newCart);
  }
}

export function setProductOrder() {
  const [cart, setCart] = useRecoilState(cartStateAtom);

  return (id) => {
    const idx = cart.findIndex(cartItem => id === cartItem.id);
    const newCart = cart.map((item, i) => {
      if (i === idx) {
        return {
          ...item,
          order: !item.order,
        }
      }
      return item;
    })
    setCart(newCart);
  }
}