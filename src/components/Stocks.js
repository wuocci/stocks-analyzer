import React, { useState } from "react";
import Papa from 'papaparse';
import csvFile from '../sourcefile/HistoricalQuotes.csv';
import moment from 'moment';
import TableRow from './TableRow';
import loader from "../loader.gif";
import Trends from "./Trends";
import App from "./App";



/*

Component for getting the stocks data and handling it.
    
Functions for all of the sorting etc.

*/

function Stocks({startState, endState}) {
    const [rows, setRows] = useState([])
    let startingIndex = 0;
    let endingIndex = 0;
    const [filledList, setList] = useState(false);
    const [resetMainMenu, setReset] = useState(false);
    

    /*

    "Fetch" the source file and parse the data to array of objects.

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
                setList(true);
                countSmaValue()
            }, 3000); //let's add a loader with setTimeOut for the sake of it. 
            setRows(rows);

        }
        getData()
    }, []) 

     
    /*

    Create an array of the given dates.
    
    Used in when finding the starting index from the original array.

    @return array of dates.
    @param the dates

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


    /* 

    Function to get the date indexes from the original array

    @return slice of the original array to make the list for the table.

    */
    const getIndexes = function () {
        var dates = getDates(new Date(startState), new Date(endState));
        startingIndex = null;
        endingIndex = null;
        var addSma = countSmaValue();
        for(var i = 0; i < rows.length; i++){
               for(var j = 0; j < dates.length; j++){
                if(rows[i].Date == dates[j]){
                    if(endingIndex != null){
                        startingIndex = i;
                    }
                    else{
                        endingIndex = i;
                    }
                }
            } 
                rows[i]["SMA 5"] = addSma[i] + " %";
            }
            return rows.slice(endingIndex, startingIndex +1)

    }


    /*
     Function to count the SMA values from 5 days. 

     (big spaghettious warnings)
    
     @return is a list for the percentage value of every value on the array object.

     */
    const countSmaValue = function () {
        var total = [];         //list of number N1-N5
        var sum = 0;            //sum of the numbers N1-N5
        var avg = 0;            //average of the numbers N1-N5
        var percent2 = 0;       // calculated percent
        var replacedClose = ""; //replace the '$' in the Close/Last data
        var replacedOpen = "";  //replace the '$' in the Open data
        var smaValues = [];     //SMA values list (percentages)
        var replacedOpens = []; // replaced Open values in list (used in % calculations)

        // Loop through the data.
        for(var i = 0; i < rows.length; i++){
            replacedOpen = rows[i].Open.replace('$', '');
            replacedOpens.push(replacedOpen);
            for(var j = i; j <= rows.length -1; j++){
                replacedClose = rows[j]["Close/Last"].replace('$', '');
                total.push(replacedClose);
                if(total.length == 5){
                    for(var k = 0; k < total.length; k++){
                        sum += Number(total[k]);
                    }
                    avg = sum / total.length // count the SMA average.
                    percent2 =  replacedOpens[i] / avg; // count the percent value.
                    percent2 = percent2 * 100;
                    var percent = Math.round(percent2) / 100 ; //rounded percent
                    smaValues.push(percent); //push percent in list

                    //null everything after 5 rounds.
                    total = [];
                    percent = 0;
                    avg = 0;
                    sum = 0;
                    break;
                }
            }
        }
        return smaValues;
    }
    

    /*

    Function to count the price differences between High and Low values.

    Append the value straight to the data.

    @return the list

    */
    const countDifferences = function () {
        var data2 = getIndexes();
        var replaceHigh = "";
        var replaceLow = "";
        var priceChange = 0;
        for(var i = 0; i < data2.length; i++){
            replaceHigh = data2[i].High.replace('$', '');
            replaceLow = data2[i].Low.replace('$', '');
            priceChange = Math.abs(replaceHigh - replaceLow);
            var priceChangeRound = Math.round(priceChange * 100) / 100;
            data2[i]['Price Change'] = priceChangeRound;
        }
        return data2;
    }


    const goToStart = () => {
        setReset(true);
    }

    if(filledList == true && resetMainMenu == false){
        var data = countDifferences();
        return ( 
            <div className ="results">
                <Trends data={data}
                startState={startState}
                endState={endState}/>
                <div className="stockTable">
                    <TableRow data={data}/> 
                </div>
                <button type="submit" className="resetButton" onClick={goToStart}>New Search</button>
             </div>
        )
    }
    else if(resetMainMenu == true){
        return(
            <App/>
        )
    }
    else{
        return(
            <div className="loaderDiv">
                <p>Just a quick load. Please wait...</p>
                <img className="loader" alt="Loader for table" src={loader}></img>
            </div>
        )
    }
  }


export default Stocks;