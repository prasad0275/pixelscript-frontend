import { useEffect, useState, useRef } from "react";
import ContentEditable from "react-contenteditable";
import SuggestionBox from '../SuggestionBox/SuggestionBox'
import "./Editor.css"
function Editor({ code = "" }) {
    const [currCode, setCurrCode] = useState('');
    const [currWord, setCurrWord] = useState('');
    const [currProp, setCurrProp] = useState('');
    const [currObj, setCurrObj] = useState('');
    const [lines, setLines] = useState(code.toString().split("\n"));
    const [showSuggestion, setShowSuggestion] = useState(false)
    const [suggestionPosition, setSuggestionPosition] = useState();
    const [cursorPosition, setCursorPosition] = useState({ start: 0, end: 0 });
    const [previousRange, setPreviousRange] = useState({ range: null });

    const editorRef = useRef();
    const contentEditableRef = useRef();


    let str = "";
    useEffect(() => {
        setCurrCode(code);
    }, [code]);

    useEffect(() => {
        setLines(currCode.toString().split('\n'))

    }, [currCode, setCursorPosition])

   
    const handleCodeChange = (e) => {
        console.log("onchange");
        setCurrCode(e.target.value);
        console.log("key : ",e.key);

        let str = e.nativeEvent.data;
        
        if(str!==undefined && str!== null && str!=="."){
            setCurrWord((prev)=>prev+str);
            // console.log("Curr word ",currWord);
            
        }
        if(str==="."){
            // console.log("After dot the word is ",currWord)
            setCurrObj(currWord);
            // console.log("curr Object",currObj);
            setCurrWord('');
            setCurrProp('')
        }
        
        else if ((previousRange.range !== null) && (e.key !== "BackSpace")) {
           setCurrProp(currWord);
        //    console.log("Curr Prop",currProp);
        }

        
        
    }
    const handleKeyDown = (e) => {
        console.log("onkeydown")
        
        if (e.key === 'Enter') {
            e.preventDefault();
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const newline = document.createTextNode("\n");

            range.deleteContents();
            range.insertNode(newline);
            range.setStartAfter(newline);
            range.setEndAfter(newline);
            selection.removeAllRanges();
            selection.addRange(range);

        }

        if (e.key == 'Tab') {
            e.preventDefault();
            // alert("tab")
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const newline = document.createTextNode("          ");

            range.deleteContents();
            range.insertNode(newline);
            range.setStartAfter(newline);
            range.setEndAfter(newline);
            selection.removeAllRanges();
            selection.addRange(range);
        }

        if (e.key == '.') {
            setShowSuggestion(true);
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                setPreviousRange({ range: selection.getRangeAt(0) });

                // const { startOffset, startContainer, endContainer, endOffset } = range;
                // setCursorPosition({ startOffset: startOffset, startContainer: startContainer, endContainer: endContainer, endOffset: endOffset });
                // console.log({ startOffset: startOffset, startContainer: startContainer, endContainer: endContainer, endOffset: endOffset });

                const rect = range.getBoundingClientRect();
                setSuggestionPosition({
                    top: rect.bottom + window.scrollY,
                    left: rect.left + window.scrollX,
                });
            }
            // setCurrObj(currWord);
            // setCurrWord('')
        } else {
            // setShowSuggestion(false);
        }

        if (e.key == " ") {
            setCurrWord('');
            setCurrObj('');
            setCurrProp('');
            setPreviousRange({ range: null });
            setShowSuggestion(false);
        }

        if(e.key === "Backspace"){
            // console.log("Backspace");
            setCurrWord((prev)=>prev.substring(0,prev.length-1));
            if (previousRange.range !== null) {
                setCurrProp(currWord);
                // console.log("Curr Prop after backspace",currProp);
             }
            setPreviousRange({ range: null });
            if(currWord.length<1){
                setShowSuggestion(false);
            }
            
        }

    };

    const handleSuggestionSelection = (suggestion) => {
        console.log(suggestion);
        // const range = cursorPosition;
        // console.log("range >>> ", window.getSelection().getRangeAt(0));
        // console.log("previous range", previousRange.range)

    

        if (contentEditableRef.current && cursorPosition) {
            // const { start, startContainer } = cursorPosition;

            const range = previousRange.range;

            // Delete the selected content
            range.deleteContents();

            // Insert the suggestion at the cursor position
            console.log("previous :", range.commonAncestorContainer)
            const node = range.commonAncestorContainer;

            let newNode = document.createElement('span');
            newNode.innerHTML = "."+suggestion;
            range.insertNode(newNode);


            // Move the cursor to the end of the inserted suggestion
            range.setStartAfter(newNode);
            range.setEndAfter(newNode);

            const nextTextNode = newNode.nextSibling;
            if (nextTextNode && nextTextNode.nodeType === Node.TEXT_NODE) {
                nextTextNode.deleteData(0, 1); // Delete one character
            }

            // Update the selection with the modified range
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(previousRange.range);

           
            // console.log("Modified Content:", document.getElementById("contentEditable").innerText);
            const modifiedContent = document.getElementById("contentEditable").innerText;
            setCurrCode(modifiedContent);

        }
    }


    return (
        <div id="code-editor">
            <div className="board" ref={editorRef}>

                <div className="numbers" id="numbers" >
                    {
                        lines.map((_, index) => (<div key={index} className="num">{index + 1}</div>))
                    }
                </div>
                <ContentEditable
                    id="contentEditable"
                    html={currCode}
                    tagName="pre"
                    onChange={handleCodeChange}
                    onKeyDown={handleKeyDown}
                    style={{ fontFamily: 'arial', margin: '0 0', padding: '4px 10px', outline: 'none' }}
                    ref={contentEditableRef}
                />


                {showSuggestion && <SuggestionBox currObj={currObj} currProp={currProp} position={suggestionPosition} handleSuggestionSelection={handleSuggestionSelection} />}


            {/* <button onClick={()=>(alert("current word : "+currWord+", current Obj :"+ currObj+", current Prop : "+currProp))}>click</button> */}
            </div>
        </div>
    )
}
export default Editor;