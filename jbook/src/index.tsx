import  ReactDOM  from "react-dom";

import 'bulmaswatch/superhero/bulmaswatch.min.css';
import CodeCell from "./components/codecell";



const App = () => {
    
    
    

    return (
        <div>
            <CodeCell/>
            <CodeCell/>
        </div>
    )
}

ReactDOM.render(<App/>,document.querySelector('#root'));