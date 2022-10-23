import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Select from 'react-select'
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from "react";
import InputMask from "react-input-mask";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';


import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Appointment = () => {
    registerLocale('ru', ru)

    const [Doc, setDoc] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const meds = [];

    const [selectedOption, setSelectedOption] = useState();


    useEffect(() => {
        getDocs();
    }, []);

    function getDocs() {
        axios.get('https://medic/api/doctors').then(function (response) {

            setDoc(response.data);



        });
    }
    Doc.forEach(row => {
        meds.push({ value: row.fio+' - '+row.spec, label: row.fio+' - '+row.spec });
    });




      const [inputs, setInputs] = useState([]);
      const handleChange = (event) => {
          const name = event.target.name;
          const value = event.target.value;
          setInputs(values => ({...values, [name]: value}));
      }
      const handleSubmit = (event) => {
        const doctore = selectedOption.value
        
          event.preventDefault();
          axios.post('https://medic/api/appointmentsave', {
            
          inputs,
          doctore,
          startDate
        
            

          }).then(function(response){
              console.log(response.data);
              
          });
          
      }




    return (
        <Popup trigger={<button className="self-center w-48 text-xl font-bold text-white bg-green-600 h-11"> Запись на прием </button>} modal>

            <form className='grid items-center grid-flow-row grid-cols-2 grid-rows-6' onSubmit={handleSubmit}>
                <p>Выберите врача: </p>
                <Select options={meds} name='doctor' onChange={setSelectedOption} defaultValue={selectedOption}  />
                <p>Выберите дату</p>
                <DatePicker selected={startDate} name='date' onChange={(date) => setStartDate(date)} className='border-2 border-black' locale="ru" dateFormat="dd/MM/yyyy" showTimeSelect='True' />
                <p>Ваше имя</p>
                <input type='text' name='pacname' className='border-2 border-black'  onChange={handleChange}></input>
                <p>Контактный телефон</p>
                <InputMask mask="+9(999)999-99-99" name='pacphone'  className='border-2 border-black'  onChange={handleChange} />
                <p>Причина обращения(на что жалуетесь)</p>
                <input type='text' name='pacad' className='border-2 border-black'  onChange={handleChange}></input>
                <input type="submit" className='col-end-3 border-2 border-black hover:bg-slate-100 hover:cursor-pointer' value="Отправить заявку"></input>
            </form>

        </Popup>
    )
}

export default Appointment