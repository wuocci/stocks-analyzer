import React, { useState } from "react";



function Stocks({startState, endState}) {
    return(
        <div>
            <h1>Pöö {startState + endState}</h1>
        </div>
    )
}



export default Stocks;