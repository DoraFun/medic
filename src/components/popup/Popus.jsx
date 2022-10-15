import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';

const Popus = ({setToken}) => {

 
  const [inputs, setInputs] = useState([]);

  const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}));
  }
  const handleSubmit = (event) => {
      event.preventDefault();

      axios.post('https://medic/api/auth', inputs).then(function(response){
          setToken(response.data)
          
      });
      
  }

  return (
    <Popup trigger={<button className="self-center w-48 text-xl font-bold text-white bg-red-500 h-11"> Авторизация </button>} modal>
      <h1>Перед записью на прием необходимо авторизироваться</h1>
      <form onSubmit={handleSubmit}>
        <p>Введите Логин:</p> <input type='text' name='login' className='border-2 border-black' onChange={handleChange}></input>
        <p>Введите Пароль:</p> <input type='password' name='pass' className='border-2 border-black' onChange={handleChange}></input>{"\n"}
        <input type="submit" className='border-2 border-black' value="Войти"></input>
      </form>

    </Popup>
  )
}

Popus.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default Popus
