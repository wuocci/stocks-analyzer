import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import {parseISO} from 'date-fns'


function InputFields() {
    //Create states for the dates.
    const [startingDate, setDate] = useState(new Date());
    const [endingDate, setEndDate] = useState(new Date());

    const handleInput = (event) =>  {
        setDate(moment(event).format('L'));
        console.log(startingDate)

    }


    const handleInput2 = (event) =>  {
        setEndDate(moment(event).format('L'));
        console.log(endingDate);
    }



    return(
        <div>
            <form className="dates">
            <p>Please select the starting date: </p>
            <DatePicker
                placeholderText={"mm/dd/yyyy"}
                selectsStart
                dateFormat="MM/dd/yyyy"
                minDate={new Date(2020, 0, 21)}
                maxDate={new Date(2021, 0, 20)}
                endDate={endingDate} // add the endDate to your startDate DatePicker now that it is defined
                onChange={handleInput}
            />
             <p>Please select the ending date: </p>
            <DatePicker
                placeholderText={"mm/dd/yyyy"}
                selectsEnd
                dateFormat="MM/dd/yyyy"
                startDate={parseISO(startingDate)}
                endDate={endingDate}
                minDate={parseISO(startingDate)}
                maxDate={new Date(2021, 0, 20)}
                onChange={handleInput2}
            />
            </form>
        </div>
    )
}

export default InputFields;
