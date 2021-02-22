import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import './style.css'


interface ProductItemProps {
  description: string,
  image: string,
  price: number,
  title: string,
}

const ProductItem = (props: ProductItemProps) => {
  const { image, description, title, price } = props
  const dispatch = useDispatch();
  const history = useHistory()

  const addToCart = () => {
    dispatch({type: 'ADD_TO_CART', payload: {title, price, image, amount:1}})
    history.push('/carrinho')
  }

  return (
    <div className='beer-box'>
      <div className='image-wrapper'>
        <img src={image} alt="cerveja" />
      </div>
      <div className='title-wrapper'>
        <span>{description}</span>
        <span>{title}</span>
      </div>
      <div className='price-wrapper'>
        <span>R$ {price}</span>
        <button onClick={addToCart}>Comprar</button>
      </div>
    </div>
  )
}

export default ProductItem