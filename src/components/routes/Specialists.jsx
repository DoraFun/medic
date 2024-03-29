import React from 'react'
import axios from 'axios'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Specialists = () => {
  const [Doc, setDoc] = useState([]);
  useEffect(() => {
    getDocs();
  }, []);
  function getDocs() {
    axios.get('https://medic/api/doctors').then(function (response) {
      console.log(response.data);
      setDoc(response.data);
    });
  }

  return (
    <div>
      <h1>Наши доктора</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>ФИО</th>
            <th>Специальность</th>
          </tr>
        </thead>
        <tbody>
          {Doc.map((doc, key) =>
            <tr key={key}>
              <td>{doc.doc_id}</td>
              <td>{doc.fio}</td>
              <td>{doc.spec}</td>

            </tr>
          )}

        </tbody>
      </table>
    </div>
  )

}

export default Specialists