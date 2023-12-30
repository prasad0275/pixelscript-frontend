import { useEffect, useState, useRef } from "react";
import ContentEditable from "react-contenteditable";
import "./Editor.css"
function Editor({ code = "" }) {
    const [lines, setLines] = useState(code.toString().split("\n"));
    const editorRef = useRef()
    console.log(">>>", lines)

    const handleCodeChange = (event) => {
        setCode(event.target.value);
      };


    useEffect(() => {
        console.log("code is changed")
        setLines(code.toString().split("\n"))


        const content = editorRef.current.innerHTML;
        console.log(">>> content \n", content);



    }, [code])
    return (
        <div id="code-editor">
            <div className="board">
                <div className="numbers" id="numbers">
                    {/* <div className="num">1</div>
                <div className="num">2</div> */}
                    {
                        lines.map((value, index) => (
                            <div key={index} className="num">{index + 1}</div>
                        ))
                    }
                </div>
                {/* <div className="editor" id="editor"
                ref={editorRef}
                contentEditable
                > */}
                {/* <div className="line">#include</div>
                <div className="line">void main(){ }</div> */}
                {/* <div className="line">{code}</div> */}
                {/* {
                        lines.map((value, index) => (
                            <div key={index} className="line">{value}</div>
                        ))
                    } */}

                {/* </div> */}
                
                <ContentEditable
                    html={code}
                    tagName="pre"
                    style={{ border: '1px solid #ccc', padding: '10px', fontFamily: 'monospace' }}
                />
            </div>
        </div>
    )
}
export default Editor;