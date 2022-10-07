import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default () => (
    <Popup trigger={<button className="button"> Open Modal </button>} modal>
    <span> Modal content </span>
  </Popup>
);