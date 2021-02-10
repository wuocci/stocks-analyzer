import React, { useState } from "react";



function Trends ({ data, startState, endState}) {


    var trendValue = 1;
    const countTheTrend = function () {
        trendValue = 0;
        var replacedClose = ""; //replace the '$' in the Close/Last data
        var replacedClose2 = ""; //replace the '$' in the Close/Last date
        for(var i = 0; i < data.length -1; i++){
            replacedClose = data[i]["Close/Last"].replace('$', '');
            replacedClose2 = data[i +1]["Close/Last"].replace('$', '');
            if(replacedClose > replacedClose2){
                trendValue = trendValue + 1;
            }
        }
        return trendValue;
    }

    var trendV = countTheTrend();


    return(
        <div>
            <h3>In Apple stock historical data the Close/Last price increased {trendV} days in a row between {startState} and {endState} .</h3>
            <p>Click on the headers in the table to sort the columns</p>
        </div>
    )
}

export default Trends;