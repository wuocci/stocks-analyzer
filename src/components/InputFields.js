import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Stocks from './Stocks';
import moment from 'moment';


function InputFields() {
    const [startingDate, setDate] = useState(null);
    const [endingDate, setEndDate] = useState(null);
    const [openStocks, setOpen] = useState(false);  
    const [startState, setStart] = useState("");
    const [endState, setEnd] = useState(""); 
    //const [wrongInput, setInput] = useState(false);
    const [isActive, setActive] = useState(true);

    var wrongInput = false;


    /*
        Handle the inputs from selected dates with separate arrow
        functions.

        @param event
     */
    const handleInput = (event) =>  {
        setDate(event);

    }
    const handleInput2 = (event) =>  {
        setEndDate(event);
    }

    /*
        Format the selected and returned date objects to string. 
    
        Easiest way (and propably the only way) 
        to get data from the source file and filter it.
    */
    const selectDates = () => {
        if(startingDate == null || endingDate == null ){
            console.log(startingDate, endingDate);
            wrongInput = true;
            setOpen(false);
            console.log(openStocks, wrongInput);
        }
        else{
            setStart(moment(startingDate).format("MM/DD/YYYY"));
            setEnd(moment(endingDate).format("MM/DD/YYYY"));
            setActive(!isActive)
            setOpen(true);
        }

    }
    
    /*  
        RENDERS:

        -If everything is fine and we still need an input, render the whole
        thing.
        
        -Else if render the error text if wrongInput == true.

        -Else render the next (stocks) component. 

    */
    if(isActive){
        return(
            <div>
                <div className="title">
                    <h1>Welcome to the stock market data analyzer!</h1>
                    <p>Please input dates to find data.</p>
                </div>
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
                    {wrongInput ? ( 
                    <div className="getButton2">
                        <p>Please give valid dates to see data!</p>
                        <button type="submit" className="getButton" onClick={selectDates}>Get data</button>
                     </div>               
                    ) : (
                        <div className="getButton2">
                        <button type="submit" className="getButton" onClick={selectDates}>Get data</button>
                    </div>)}
            </div>
            )
        }
    else{
        return(
            <div>
                <Stocks startState={startState}
                endState={endState}/>
            </div>
        )
    } 
}

export default InputFields;