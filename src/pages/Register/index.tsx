import React, { useRef, useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import logo from '../../images/logo-transparente.png'

import './style.css'

const RegisterPage = () => {
  const nameInput = useRef<HTMLInputElement>(null)
  const emailInput = useRef<HTMLInputElement>(null)
  const passwordInput = useRef<HTMLInputElement>(null)
  const ageInput = useRef<HTMLInputElement>(null)

  const [registered, setRegistered] = useState<boolean>(false);

  const Register = (event: any) => {
    event.preventDefault();
    const newUser = {
      name: nameInput.current?.value,
      email: emailInput.current?.value,
      password: passwordInput.current?.value,
      age: ageInput.current?.value
    }
    const ageValidation = ((ageInput.current) && (parseInt(ageInput.current.value) >= 18));

    // juntar as validações aqui
    if (ageValidation) {
      axios.post('http://localhost:4000/register', newUser)
        .then(resposta => {
          localStorage.setItem("token", resposta.data.accessToken)
          setRegistered(true);
        })
    } else {
      alert('Menores de 18 anos não podem entrar')
    }
  }
    console.log(registered)
    return (
      registered ? <Redirect to={'/home'}/>
      :
      <div className='form-wrapper'>
        <form onSubmit={Register} className='register-form'>
          <img src={logo} alt='logo'/>
          <input type="text" ref={nameInput} placeholder="Insira seu nome aqui" required /> <br/>
          <input type="email" ref={emailInput} placeholder="Insira seu e-mail aqui" required /> <br/>
          <input type="password" ref={passwordInput} placeholder="Insira sua senha aqui" required /> <br/>
          <input type="number" ref={ageInput} placeholder="Insira sua idade aqui" required /> <br/>
          <button>Cadastro</button>
        </form>
      </div>
  )
}

export default RegisterPage