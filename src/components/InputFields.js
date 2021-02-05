import React, { useState } from "react";

function InputFields() {
    const [startingDate, setDate] = useState([]);
    const [endingDate, setEndDate] = useState([]);

    /*
    * Let's check the given values in the arrow functions the below 
    * and set the states correctly.
    */

    const handleInput = event => {
        startingDate.push(event.target.value);
    }

    const handleInput2 = event => {
        setEndDate(event.target.value);
    }

    return(
        <div>
            <form className="dates">
            <p>Please give starting date (MM/DD/YY) </p>
            <label className="startDate">
                <select className="month" onChange={handleInput}>
                    <option value="0">Month:</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
                <select className="day" onChange={handleInput}>
                    <option value="01">1</option>
                    <option value="02">2</option>
                    <option value="03">3</option>
                    <option value="04">4</option>
                    <option value="05">5</option>
                    <option value="06">6</option>
                    <option value="07">7</option>
                    <option value="08">8</option>
                    <option value="09">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                    <option value="24">24</option>
                    <option value="25">25</option>
                    <option value="26">26</option>
                    <option value="27">27</option>
                    <option value="28">28</option>
                    <option value="29">29</option>
                    <option value="30">30</option>
                    <option value="31">31</option>
                </select>
                <select className="day" onChange={handleInput}>
                    <option value="0">Year:</option>
                    <option value="1">2020</option>
                    <option value="2">2021</option>
                </select>
            </label>
            </form>
        </div>
    )
}

export default InputFields;
