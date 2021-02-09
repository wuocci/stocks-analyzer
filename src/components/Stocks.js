import React, { useState } from "react";
import Papa from 'papaparse';
import csvFile from '../sourcefile/HistoricalQuotes.csv';
import moment from 'moment';
import TableRow from './TableRow';
import loader from "../loader.gif";



function Stocks({startState, endState}) {
    const [rows, setRows] = useState([])
    let startingIndex = 0;
    let endingIndex = 0;
    const [filledList, setList] = useState(false);

    /*
     * Fetch the source file and parse the data to array of objects.
     */
    React.useEffect(() => {
        async function getData() {
            const response = await fetch(csvFile)
            const reader = response.body.getReader()
            const result = await reader.read() // raw array
            const decoder = new TextDecoder('utf-8')
            const csv = decoder.decode(result.value) // the csv text
            const results = Papa.parse(csv, { header: true }) // object with { data, errors, meta }
            const rows = results.data // array of objects
            const timer = setTimeout(() => {
                setRows(rows)
                setList(true);
            }, 2000);
            
        }
        getData()
    }, []) 

     
    /*
    * Create an array of the given dates.
    *
    * Used in when finding the starting index from the original array.
    */

    var getDates = function(startDate, endDate) {
        var dates = [],
            currentDate = startDate,
            addDays = function(days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            };
        while (currentDate <= endDate) {
            dates.push(moment(currentDate).format("MM/DD/YYYY"));
            currentDate = addDays.call(currentDate, 1);
        }
        return dates;
    };

    var dates = getDates(new Date(startState), new Date(endState)); 

    /*
    * Function to get the date indexes from the original array
    *
    * Then slice the original array to make the list for the table
    */
    const getIndexes = function () {
        startingIndex = 0;
        endingIndex = 0;
        for(var i = 0; i < rows.length; i++){
            for(var j = 0; j < dates.length; j++){
                if(rows[i].Date == dates[j]){
                    if(endingIndex != 0){
                        startingIndex = i;
                    }
                    else{
                        endingIndex = i;
                    }
                }
            }
        } 
        return rows.slice(endingIndex -1, startingIndex +1);
    }

    
    
    if(filledList == true){
        var data = getIndexes();
        return (
        <div className="stockTable">
            <TableRow data={data}/>
        </div>
        )
    }
    else{
        return(
            <div>
                <img className="loader" alt="Loader for table" src={loader}></img>
            </div>
        )
    }
  }


export default Stocks;