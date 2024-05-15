import { useEffect, useMemo, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/ext-language_tools";
import 'ace-builds/src-noconflict/mode-javascript';
import { edit } from "ace-builds";
import SuggestionBox from "../SuggestionBox/SuggestionBox";
import { useDispatch, useSelector } from "react-redux";
import { saveFile } from "../../../store/fileSlice";

function Textarea({ }) {
    const dispatch = useDispatch();
    const selectedFile = useSelector(state => state.fileSlice.selectedFile);

    const [showSuggestion, setShowSuggestion] = useState(false);
    const [suggestionPosition, setSuggestionPosition] = useState();
    const [position, setPosition] = useState({ row: 0, column: 0 });
    const [word, setWord] = useState('');
    const [currCode, setCurrCode] = useState(selectedFile.code);
    const [mode, setMode] = useState('')
    const editorRef = useRef(null);
    var w = '';

    useEffect(() => {
        setCurrCode(selectedFile.code);
        var temp_mode = 'java';
        if (selectedFile.extension == 'cpp') {
            temp_mode = 'cpp';
        }
        else if (selectedFile.extension == 'java') {
            temp_mode = 'java'
        }
        else if (selectedFile.extension === 'py') {
            temp_mode = 'python'
        }
        setMode(temp_mode);
    }, [selectedFile])

    useEffect(() => {
        console.log("code : ", selectedFile)
        const editor = editorRef.current.editor;
        // editor.setValue(code);
        editor.on("change", (e) => {
            var char = e.lines[0];
            // console.log("event :", e);
            // console.log("key : ", char);
            setPosition(e.end);
            setWord(value => value + char);
            // if (char === '.') {
            console.log("show suggestion");
            console.log("Word :", w);
            const session = editor.getSession();
            const row = 2;
            const column = 5;
            const text = "Hare Krishna";
            setShowSuggestion(true);

            // }
            if (e.action == 'remove') {
                w = word.substring(0, word.length - 2);
                // console.log("word", e.action, w);
                setWord(w);
            }
            if (char === '.') {
                w = ''
                setShowSuggestion(false)
                setWord('')
            }
            w += char;
            if (char.includes(" ")) {
                w = '';
                setShowSuggestion(false);
                setWord('')
            }




        })
        editor.getSession().selection.on('changeCursor', () => {
            // Get the current cursor position
            const cursorPosition = editor.getCursorPosition();
            // Convert cursor position to screen coordinates
            const { pageX, pageY } = editor.renderer.textToScreenCoordinates(cursorPosition.row, cursorPosition.column);
            // Update state with caret position
            setSuggestionPosition({ top: pageY + 15, left: pageX });
        });
    }, [])



    const handleSuggestionSelection = (text) => {
        const row = position.row;
        const column = position.column;
        const session = editorRef.current.editor.getSession();
        session.remove({ start: { row, column: column - word.length }, end: { row, column: column } });
        session.insert({ row, column }, text + " ");
        setShowSuggestion(false);
        const editor = editorRef.current.editor;
        editor.selection.moveTo(row, column + text.length);
        setWord('');
    }

    const handleOnChange = (value) => {
        setCurrCode(value);
        // console.log("Handle code change : ", selectedFile)
        const tempFile = {
            id: selectedFile.id,
            name: selectedFile.name,
            extension: selectedFile.extension,
            code: value
        }

        // console.log("Code : ", tempFile)
        dispatch(saveFile(tempFile))
    }

    return (
        <>
            <AceEditor
                id="editor"
                ref={editorRef}
                mode={mode}
                theme="terminal"
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                style={{ 'flex': '1', 'width': '100%', 'zIndex': '0' }}
                value={currCode}
                onChange={handleOnChange}
                placeholder="Write your code here..."
                fontSize={'20px'}
            />

            {/* <div>{word}</div> */}
            {showSuggestion && <SuggestionBox mode={selectedFile.extension} currObj={word} currProp={word} position={suggestionPosition} handleSuggestionSelection={handleSuggestionSelection} />}

        </>

    )
}

export default Textarea;