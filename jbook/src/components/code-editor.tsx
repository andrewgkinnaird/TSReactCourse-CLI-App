import MonacoEditor, {EditorDidMount} from '@monaco-editor/react';
import { useRef } from 'react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import './code-editor.css';
import './syntax.css';
import CodeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';


interface CodeEditorProps{
    initialValue:string;
    onChange(value:string):void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({initialValue,onChange}) => {
    const editorRef = useRef<any>();
    const editorDidMount:EditorDidMount = (getValue, monacoEditor) => {
        editorRef.current = monacoEditor;
        monacoEditor.onDidChangeModelContent(() => onChange(getValue()));
        monacoEditor.getModel().updateOptions({tabSize:2});

        const highlighter = new Highlighter(
            // @ts-ignore
            window.monaco,
            CodeShift,
            monacoEditor
        );

        highlighter.highLightOnDidChangeModelContent(
            () => {},
            () => {},
            undefined,
            () => {}
        );
    }
    
    
    const formatButtonClick = () => {
        
        const unformatted = editorRef.current.getModel().getValue();
        
        const formatted = prettier.format(unformatted, {
            parser:'babel',
            plugins:[parser],
            useTabs:false,
            semi:true,
            singleQuote:true
        }).replace(/\n$/,'');

        editorRef.current.getModel().setValue(formatted);
    }

    return (
        <div className='editor-wrapper'>
            <button className='button button-format is-primary is-small' onClick={formatButtonClick}>Format</button>
            <MonacoEditor 
                options={{
                    
                    wordWrap:'on',
                    minimap:{enabled:false},
                    showUnused:false,
                    folding:false,
                    lineNumbersMinChars: 3,
                    fontSize:32,
                    automaticLayout:true,
                    scrollBeyondLastLine:false
                }}
                editorDidMount={editorDidMount}
                value={initialValue}
                theme='dark' 
                language='javascript' 
                height={'300px'} />
        </div>);
    
}

export default CodeEditor;