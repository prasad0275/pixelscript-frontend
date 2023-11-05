import { useEffect, useState } from "react";
import "./Editor.css"
function Editor({ code = "" }) {
    const [lines, setLines] = useState(code.toString().split("\n"));
    console.log(">>>", lines)
    useEffect(() => { setLines(code.toString().split("\n")) }, [code])
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
                <div className="editor" id="editor" contentEditable
                >
                    {/* <div className="line">#include</div>
                <div className="line">void main(){ }</div> */}
                    {/* <div className="line">{code}</div> */}
                    {
                        lines.map((value, index) => (
                            <div key={index} className="line">{value}</div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default Editor;