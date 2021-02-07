import '../App.css';
import InputFields from './InputFields.js';


/*
 * Just a simple App component which has titles. 
 * 
 * Calls InputFields component which has DatePickers.
 *
*/

function App() {
  return(
    <div>
      <div className="title">
        <h1>Welcome to the stock market data analyzer!</h1>
        <p>Please input dates to find data.</p>
      </div>
      <div className="inputfields">
        <InputFields/>
      </div>
      
    </div>
  )
}
export default App;
