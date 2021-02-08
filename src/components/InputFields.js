import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GetButton from './GetButton'


function InputFields() {
    //States for the dates.
    const [startingDate, setDate] = useState("");
    const [endingDate, setEndDate] = useState("");

    /*
     * Handle the inputs from selected dates with separate arrow
     * functions.
     */

    const handleInput = (event) =>  {
        setDate(event);
        console.log(startingDate)

    }
    const handleInput2 = (event) =>  {
        setEndDate(event);
        console.log(endingDate);
    }

    return(
        <div>
            <div className="dates">
                <DatePicker // Let's create a DatePicker component for making it easy to select the dates
                    selected={startingDate}
                    placeholderText={"Select Start Date"}
                    selectsStart
                    dateFormat="MM/dd/yyyy"
                    startDate={startingDate}
                    minDate={new Date(2020, 0, 21)}
                    maxDate={new Date(2021, 0, 20)}
                    endDate={endingDate} // add the endDate to your startDate DatePicker now that it is defined
                    onChange={handleInput}
                />
                <DatePicker
                    selected={endingDate}
                    placeholderText={"Select End Date"}
                    selectsEnd
                    dateFormat="MM/dd/yyyy"
                    startDate={startingDate}
                    endDate={endingDate}
                    minDate={startingDate}
                    maxDate={new Date(2021, 0, 20)}
                    onChange={handleInput2}
                />
                </div>
                <GetButton startingDate={startingDate}
                    endingDate={endingDate}/>
            </div>
        )
}

export default InputFields;