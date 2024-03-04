import { useSelector } from "react-redux";
import "./RunPanel.css"
import { useState } from "react";
import { compile as compileJava, run as runJava } from "../../../api/compile/javaService";
import { compile as compileCPP, run as runCPP } from "../../../api/compile/cppService";
import { Await } from "react-router-dom";

function RunPanel() {

    const file = useSelector(state => state.fileSlice.selectedFile);
    const [textareaInput, setTextareaInput] = useState('');
    const [output, setOutput] = useState();
    const [outputLoader, setOutputLoader] = useState(false);
    const [toggleInputOutput, setToggleInputOutput] = useState(true);
    const handleRunBtn = async () => {
        const data = {
            filename: file.name,
            extension: file.extension,
            code: file.code,
            input: textareaInput
        }
        console.log("RunPanel :: HandleRunBtn ", data);
        setToggleInputOutput(false);
        if (file.extension == 'java') {
            setOutputLoader(true);
            const response = await runJava(data).finally(()=>(setOutputLoader(false)));
            if (response.status == 200) {
                console.log(response.data.output);
                setOutput(response.data.output + "\n\n .....Press Exit to close console!");
            }
            else{
                setOutput(response.message + "\n\n .....Press Exit to close console!");
            }
        }
        else if (file.extension == 'cpp') {
            setOutputLoader(true);
            const response = await runCPP(data).finally(()=>(setOutputLoader(false)));;
            if (response.status == 200) {
                setOutput(response.data.output + "\n\n .....Press Exit to close console!");
                setOutputLoader(false);
            }
            else{
                setOutput(response.message + "\n\n .....Press Exit to close console!");
            }
        }
    }

    const handleBack = () => {
        setToggleInputOutput(true);
    }

    return (
        <div id="run-panel" className="flex-col px-20">
            {toggleInputOutput &&
                <div id="input">
                    <div id="input-textarea">
                        <div className="flex flex-col">
                            <p className="p">Enter you inputs :</p>
                            <textarea className="textarea textarea-output" name="" id="" cols="50" rows="10"
                                value={textareaInput}
                                onChange={(e) => setTextareaInput(e.target.value)}
                            ></textarea>
                        </div>
                        {/* <div className="flex flex-col">
                    <p className="p">Output : </p>
                    <textarea name="" id="" cols="0" rows="10"></textarea>
                </div> */}
                    </div>
                    <div style={{ 'float': 'right' }}>
                        <button className="run-btn flex align-items-center" onClick={handleRunBtn}>
                            <div id="run" className="block">
                                Run
                            </div>
                            <span className="material-symbols-outlined">
                                play_arrow
                            </span>
                        </button>
                    </div>
                </div>
            }


            {!toggleInputOutput &&
                <div id="output">
                    {outputLoader && <div className="loader" style={{ 'height': '50px', 'width': '50px' }}></div>}
                    {!outputLoader && <>
                        <div id="output-textarea">
                            <div className="flex flex-col">
                                <p className="p">Output :</p>
                                <textarea className="textarea textarea-output" name="" id="" cols="50" rows="10"
                                    value={output}
                                ></textarea>
                            </div>
                        </div>
                        <div style={{ 'float': 'right' }}>
                            <button className="run-btn flex align-items-center" onClick={() => setToggleInputOutput(true)}>
                                <div className="block">
                                    Exit
                                </div>
                            </button>
                        </div></>
                    }
                </div>
            }
        </div>
    )
}
export default RunPanel