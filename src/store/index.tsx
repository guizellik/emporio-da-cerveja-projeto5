import React from 'react'
import  { createStore } from 'redux'

interface CartProduct {
  title: string,
  price: number,
  image: string,
  amount: number
}

export interface CartState {
  cartProducts: CartProduct[]
}

const initialState: CartState = {
  cartProducts: []
}

function reducerOrder(state = initialState, action: any) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartProducts: [...state.cartProducts, action.payload]
      }
    case "INCREASE_PRODUCT_AMOUNT":
      return {
        ...state,
        cartProducts: state.cartProducts.map((product) => {
          return product.title === action.payload ? {...product, amount: product.amount + 1} : product
        })
      }
      case "DECREASE_PRODUCT_AMOUNT":
      return {
        ...state,
        cartProducts: state.cartProducts.map((product) => {
          return product.title === action.payload ? {...product, amount: product.amount - 1} : product
        })
      }
      case "DELETE_PRODUCT":
        return {
          ...state,
          cartProducts: state.cartProducts.filter((item) => {
            return item.title !== action.payload
          })
        }
      case "CLEAR_CART":
        return initialState
    default:
      return state;
  }
}

export const store = createStore(reducerOrder)
