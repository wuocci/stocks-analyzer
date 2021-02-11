import React, { useState } from "react";



function Trends ({ data, startState, endState}) {
    var trendValues = []; 
    var trendValue = 1;


    /*
        Function for getting the upward trend days in a row.

        Hassle with lists and loops.

        @return the max value of list (max days upward) 
    */
    const countTheTrend = function () {
        trendValues = [];
        trendValue = 1;
        var replacedClose = ""; //replace the '$' in the Close/Last data
        var replacedClose2 = ""; //replace the '$' in the Close/Last date
        for(var i = 0; i < data.length -1; i++){
            replacedClose = data[i]["Close/Last"].replace('$', '');
            replacedClose2 = data[i +1]["Close/Last"].replace('$', '');
            if(replacedClose > replacedClose2){
                trendValue = trendValue + 1;
            }
            else{
                trendValues.push(trendValue);
                trendValue = 1;
            }
        }
        
        trendValues.push(trendValue);
        var maxUpwardDays = Math.max.apply(Math,trendValues)
        return maxUpwardDays; 
    }



    return(
        <div className="textBox">
            <h3>In Apple stock historical data the Close/Last price increased {countTheTrend()} days in a row between {startState} and {endState}.</h3>
            <p>Click on the headers in the table to sort the columns.</p>
            <p>Use SHIFT + click to sort multiple columns. </p>
        </div>
    )
}

export default Trends;