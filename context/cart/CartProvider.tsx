import { FC, useReducer, PropsWithChildren, useEffect } from 'react';
import Cookie from 'js-cookie';

import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';

export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
};

const CART_INITIAL_STATE = {
  cart: [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0
};

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {

  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  useEffect(() => {
    try {
      const productsInCookies = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
      dispatch({ type: '[CART] - LoadCart from cookies | storage', payload: productsInCookies })
    } catch (error) {
      dispatch({ type: '[CART] - LoadCart from cookies | storage', payload: [] })
    }
  }, [])

  useEffect(() => {
    // Cookie.set('cart', JSON.stringify(state.cart))
    if (state.cart.length > 0) Cookie.set('cart', JSON.stringify(state.cart))
  }, [state.cart])

  useEffect(() => {
    const numberOfItems = state.cart.reduce((prev, current) => current.quantity + prev, 0);
    const subTotal = state.cart.reduce((prev, current) => (current.price * current.quantity) + prev, 0);
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxRate,
      total: subTotal * (taxRate + 1)
    }
    dispatch({ type: '[CART] - Update order summary', payload: orderSummary })
  }, [state.cart])


  const addProductToCart = (product: ICartProduct) => {


    const productInCard = state.cart.some((prod) => prod._id === product._id)
    if (!productInCard) return dispatch({ type: '[CART] - Update product in cart | storage', payload: [...state.cart, product] });

    const productInCartWithDifferentSize = state.cart.some((prod) => prod._id === product._id && prod.size === product.size);
    if (!productInCartWithDifferentSize) return dispatch({ type: '[CART] - Update product in cart | storage', payload: [...state.cart, product] });

    const updatedProducts = state.cart.map((prod) => prod._id === product._id && prod.size === product.size ? { ...prod, quantity: prod.quantity + product.quantity } : prod);

    return dispatch({ type: '[CART] - Update product in cart | storage', payload: updatedProducts });
  }

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: '[CART] - Change cart quantity', payload: product })
  };

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: '[CART] - Remove product in cart', payload: product })
  };

  return (
    <CartContext.Provider value={{
      ...state,

      // Methods
      addProductToCart,
      updateCartQuantity,
      removeCartProduct
    }}>
      {children}
    </CartContext.Provider>
  )
};