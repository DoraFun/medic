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
    axios.get('https://med/api/users').then(function (response) {
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
              <td>{doc.spec_id}</td>

              {/* <td>
                <Link to={`user/${user.id}/edit`} style={{ marginRight: "10px" }}>Edit</Link>
                <button>Delete</button>
              </td> */}
            </tr>
          )}

        </tbody>
      </table>
    </div>
  )

}

export default Specialists