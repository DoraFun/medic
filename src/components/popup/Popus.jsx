import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

async function loginUser(credentials) {
  return fetch('https://medic/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}
//for test only

const Popus = ({ setToken }) => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }

  return (
    <Popup trigger={<button className="self-center w-48 text-xl font-bold text-white bg-red-500 h-11"> Авторизация </button>} modal>
      <h1>Перед записью на прием необходимо авторизироваться</h1>
      <form onSubmit={handleSubmit}>
        <p>Введите Логин:</p> <input type='text' className='border-2 border-black' onChange={e => setUserName(e.target.value)}></input>
        <p>Введите Пароль:</p> <input type='password' className='border-2 border-black' onChange={e => setPassword(e.target.value)}></input>{"\n"}
        <input type="submit" className='border-2 border-black' value="Войти"></input>
      </form>

    </Popup>
  )
}

export default Popus
