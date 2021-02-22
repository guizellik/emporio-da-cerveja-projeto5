import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import logo from '../../images/emporio-logo.png'
import { CartState } from '../../store'

import './styles.css'

interface HeaderProps {
  showCategory?: boolean
}

const Header = (props: HeaderProps) => {
  const token = localStorage.getItem('token');
  const { showCategory } = props
  const [category, setCategory] = useState([])

  useEffect(() => {
    if(token) {
      const headers = {
        'Authorization': `Bearer ${token}`
      }
      axios.get('http://localhost:4000/categories', { headers: headers })
        .then(resposta => setCategory(resposta.data))
    }
  }, [token])

  const cartItemsAmount = useSelector((state: CartState) => state.cartProducts.length)
  const cartTotal = useSelector((state: CartState) => {
    let sum = 0;
    state.cartProducts.forEach((product) => {
      sum += product.price
    });
    return sum;
  })
  return (
    <div className='header-wrapper'>
      <header className='header'>
        <Link to='/home'>
          <img src={logo} alt="logo"/>
        </Link>
        <Link to='/carrinho' className='cart-link'>
          <div className='cart-details'>
            <Badge badgeContent={cartItemsAmount} color="secondary" className='badge'>
              <ShoppingCartIcon />
            </Badge>
            <span className='cart-price'>
              {cartItemsAmount > 0 ? `R$ ${cartTotal}` : 'Vazio :('}
            </span>
          </div>
        </Link>
      </header>
      { showCategory ? <ul className='menu-categories'>
        {
          category?.map((item, index) => (
            <li key={index}>{item}</li>
          ))
        }
      </ul> : '' }
    </div>
  )
}

export default Header