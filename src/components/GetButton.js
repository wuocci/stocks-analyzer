import React, { useState } from "react";
import moment from 'moment';
import Stocks from './Stocks'

function GetButton({startingDate, endingDate}){

    const [openStocks, setOpen] = useState(false);  
    const [startState, setStart] = useState("");
    const [endState, setEnd] = useState(""); 



    /*
     * Format the selected and returned date objects to string. 
     * 
     * Easiest way (and propably the only way) 
     * to get data from the source file and filter it.
     */

    const selectDates = () => {
        setStart(moment(startingDate).format("MM/DD/YYYY"));
        setEnd(moment(endingDate).format("MM/DD/YYYY"));
        setOpen(true);

    }

    if(openStocks === false){
        return(
            <div className="getButton2">
                <button type="submit" className="getButton" onClick={selectDates}>Get data</button>
            </div>
        )
    }
    else{
        return(
            <Stocks startState={startState}
            endState={endState}/>
        )
    } 

}

export default GetButton;