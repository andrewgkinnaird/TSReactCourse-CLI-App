import  ReactDOM  from "react-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugins";

import * as esbuild from 'esbuild-wasm';

const App = () => {
    const [input,setInput] = useState('');
    const [code,setCode] = useState('');
    const ref = useRef<any>();

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker:true,
            wasmURL:'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'    
        });
        
    }
    useEffect(() => {
        startService();
    },[]);

    const onClick = async () => {
        if(!ref){
            return;
        }

        const result = await ref.current.build({
            entryPoints:['index.js'],
            bundle:true,
            write:false,
            plugins:[unpkgPathPlugin(),fetchPlugin(input)],
            define:{
                'process.env.NODE_ENV': '"production"',
                global:'window'
            }
        })

        
        setCode(result.outputFiles[0].text);
        
    }
    
    const html = `
        <script>${code}</script>
    `;

    return (
        <div>
            <textarea value={input} onChange={(e) => setInput(e.target.value) }></textarea>
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <iframe sandbox='allow-scripts' srcDoc={html}></iframe>
        </div>
    )
}

ReactDOM.render(<App/>,document.querySelector('#root'));