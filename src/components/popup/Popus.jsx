import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default () => (
    <Popup trigger={<button className="self-center w-48 text-xl font-bold text-white bg-red-500 h-11"> Авторизация </button>} modal>
        <h1>Перед записью на прием необходимо авторизироваться</h1>
    <p>Введите Логин:</p> <input type='text' className='border-2 border-black'></input>
    <p>Введите Пароль:</p> <input type='password'  className='border-2 border-black'></input>{"\n"}
    <input type="submit" className='border-2 border-black' value="Войти"></input>
  </Popup>
);