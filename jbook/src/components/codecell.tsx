
import { useState } from "react";
import bundle from '../bundler';
import Preview from "./preview";
import CodeEditor from "./code-editor";


const CodeCell = () => {
    const [input,setInput] = useState('');
    const [code,setCode] = useState('');
    

    
    

    const onClick = async () => {
        

        const output = await bundle(input); 
        setCode(output);
        
       
        
        
        
    }
    
    

    return (
        <div>
            <CodeEditor onChange={(value) => setInput(value)} initialValue="let i = 5"></CodeEditor>
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <Preview code={code} />
        </div>
    )
}

export default CodeCell;