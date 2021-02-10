import '../App.css';
import InputFields from './InputFields.js';
import React, { useState } from 'react';

/*
 * Just a simple App component which has titles. 
 * 
 * Calls InputFields component which has DatePickers.
 *
*/

function App() {
    return(
        <div className="inputfields">
          <InputFields/>
        </div>
    )
  }
  
export default App;
