import React, { useState } from "react";
import Papa from 'papaparse';
import csvFile from '../sourcefile/HistoricalQuotes.csv';
import moment from 'moment';



function Stocks({startState, endState}) {
    const [rows, setRows] = useState([])
    let startingIndex = 0;

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
            setRows(rows)
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

    

    

    return (
      <div className="app">
        
      </div>
    )
  }


export default Stocks;