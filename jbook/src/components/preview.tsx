import { useEffect, useRef } from "react";

interface PreviewProps {
    code:string;
}

const html = `
        <html>
            <head></head>
            <body>
                <div id="root"></div>
                <script>
                    window.addEventListener('message', (event) => {
                        try{
                            eval(event.data);
                        }
                        catch(err){
                            const root = document.querySelector('#root');
                            root.innerHTML = '<h1>' + err + '</h1>';
                            console.error(err);
                        }
                    }, false)
                    
                </script>
            </body>
        </html>
    `;

const Preview:React.FC<PreviewProps> = ({code}) => {
    const iframe = useRef<any>();

    useEffect(() => {
        iframe.current.srcdoc = html;
        iframe.current.contentWindow.postMessage(code,'*');
    },[code]);

    return (
        <iframe 
        title="code preview" ref={iframe} sandbox='allow-scripts' srcDoc={html}
        ></iframe>
    )
}

export default Preview;