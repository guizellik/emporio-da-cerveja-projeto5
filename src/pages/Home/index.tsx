import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import { Product } from '../../types/types'
import ProductItem from '../../components/ProductItem'
import Header from '../../components/Header'
import './style.css'
import copo from '../../images/copo-cerveja.png'

const Home = () => {
  const token = localStorage.getItem('token');

  const [product, setProduct] = useState([])

  useEffect(() => {
    if(token) {
      const headers = {
        'Authorization': `Bearer ${token}`
      }
      axios.get('http://localhost:4000/beers', { headers: headers })
        .then(resposta => setProduct(resposta.data))
    }
  },[token]);

  return (
    token ?
    <div className='homepage'>
      <Header showCategory />
      <div className='feat-content'>
        <img src={copo} alt='copo' />
        <h4>Destaques no Empório</h4>
      </div>
      <div className='beer-list'>
        {
          product?.map((item: Product) => (
            <ProductItem image={item.image} description={item.description} title={item.title} price={item.price} />
          ))
        }
      </div>
    </div> :
    <Redirect to='/registro' />
  )
}

export default Home