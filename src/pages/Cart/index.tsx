import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CartState } from '../../store'
import { useHistory, Redirect } from 'react-router-dom'
import Header from '../../components/Header'
import './style.css'
import toast, { Toaster } from 'react-hot-toast';


const Cart = () => {
  const token = localStorage.getItem('token');
  const cartProducts = useSelector((state: CartState) => state.cartProducts)
  const history = useHistory()
  const dispatch = useDispatch()

  return (
    token ?
    <div className='cart-page'>
      <Header />
      {
        cartProducts.map((product) => {
          return (
            <div className='cart-products-wrapper'>
              <div className='cart-product-price'>
                <img src={product.image} key={product.title} alt="cartProduct"/>
                <span>R$ {product.price}</span>
              </div>
              <div className='cart-product-details-buton'>
                <span>{product.title}</span>
                <div className='buttons-wrapper'>
                  <button
                    className='plus'
                    onClick={() => dispatch({ type: 'INCREASE_PRODUCT_AMOUNT', payload: product.title })}
                  >
                    +
                  </button>
                  <input type="number" value={product.amount} readOnly className='amount-input' />
                  <button
                    className='minus'
                    onClick={() => dispatch({ type: 'DECREASE_PRODUCT_AMOUNT', payload: product.title })}
                  >
                    -
                  </button>
                  <button
                    className='delete'
                    onClick={() => dispatch({ type: 'DELETE_PRODUCT', payload: product.title })}
                  >
                    x
                  </button>
                </div>
              </div>
            </div>
          )
        })
      }
      <div className='cart-buttons'>
        <Toaster />
        <button onClick={() => history.goBack()}>Continuar comprando</button>
        <button onClick={
          () => {
            dispatch({ type: 'CLEAR_CART' })
            toast.success('Seu pedido foi finalizado!')
            history.push('/home')
          }
          }>Finalizar compra</button>
        </div>
    </div>
    : <Redirect to='/registro' />
  )
}

export default Cart