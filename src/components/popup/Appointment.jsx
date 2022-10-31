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
import $ from 'jquery';


import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Appointment = () => {
    registerLocale('ru', ru)

    const [Doc, setDoc] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const meds = [];
    const specs = [];

    const [selectedOption, setSelectedOption] = useState();
    const [selectedOption2, setSelectedOption2] = useState();


   
    useEffect(() => {
        getDocs();
    }, []);

    function getDocs() {
        axios.get('https://medic/api/doctors').then(function (response) {

            setDoc(response.data);



        });
    }
    Doc.forEach(row => {
        meds.push({ value: row.fio, label:row.fio});
        specs.push({ value:row.spec, label:row.spec });
    });




      const [inputs, setInputs] = useState([]);
      const handleChange = (event) => {
          const name = event.target.name;
          const value = event.target.value;
          setInputs(values => ({...values, [name]: value}));
      }
      const handleSubmit = (event) => {
        const doctore = selectedOption.value
        const speco = selectedOption2.value
          event.preventDefault();
          
          axios.post('https://medic/api/appointmentsave', {
        
          inputs,
          doctore,
          speco,
          startDate
        
            

          }).then(function(response){
              console.log(response);
              
              axios({
                url: 'https://medic/api/Talon.pdf',
                method: 'GET',
                responseType: 'blob', // important
              }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Talon.pdf');
                document.body.appendChild(link);
                link.click();
              });
            
          });
      }




    return (
        <Popup trigger={<button className="self-center w-48 text-xl font-bold text-white bg-green-600 h-11"> Запись на прием </button>} modal>

            <form className='grid items-center grid-flow-row grid-cols-2 grid-rows-6' onSubmit={handleSubmit}>
                <p>Выберите специалиста: </p>
                <Select options={specs} name='doctor' onChange={setSelectedOption2} defaultValue={selectedOption2}  />
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