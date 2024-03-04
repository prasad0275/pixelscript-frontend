import SideBar from "./SideBar/SideBar"
import Editor from "./Editor/Editor"
import "./Main.css"
import RunPanel from "./RunPanel/RunPanel"
import SideMenu from "./SideMenu/SideMenu"
import { useEffect, useState } from "react"
import ErrorConsole from "./ErrorConsole/ErrorConsole"
import DialogBox from "./DialogBox/DialogBox"

import { useDispatch, useSelector } from "react-redux"
import { saveFile, selectFile } from "../../store/fileSlice"
import Textarea from "./Editor/Textarea"
import { nanoid } from "@reduxjs/toolkit"

function Main({ showRunPanel }) {

    //reduxtoolkit
    const files = useSelector(state => state.fileSlice.files)
    const file = useSelector(state => state.fileSlice.selectedFile);
    const dispatch = useDispatch()
    const [showSideMenu, setShowSideMenu] = useState(false)
    const [showErrorConsole, setShowErrorConsole] = useState(false)
    const [showDialogBox, setShowDialogBox] = useState(false)
    const [selectedFile, setSelectedFile] = useState({
        id: nanoid(),
        name: "First",
        extension: 'java',
        code: "class First{\n public static void main(String args[]){\n \n }\n}",
    })


    const handleShowSideMenu = () => {
        setShowSideMenu(prev => !prev)
    }

    const handleShowDialogBox = () => {
        setShowDialogBox(prev => !prev)
    }


    const handleShowErrorConsole = () => {
        setShowErrorConsole(prev => !prev)
    }

    const handleFileSelection = (file) => {
        dispatch(selectFile(file))
    }

    const handleFileUpload = () => {
        const selectElement = document.getElementById('selectFile');

        const selectedOption = selectElement.options[selectElement.selectedIndex];

        if (selectedOption) {
            const selectedValue = selectedOption.value;
            const selectedTitle = selectedOption.text;
        }
    }


    useEffect(() => {

    }, [selectedFile])

    return (
        <div className="flex main">
            <SideBar handleShowSideMenu={handleShowSideMenu} handleShowDialogBox={handleShowDialogBox} handleShowErrorConsole={handleShowErrorConsole} />
            {showSideMenu && <SideMenu files={files} handleFileSelection={handleFileSelection} />}
            <div className="flex flex-col center">
                {/* <Editor code={selectedFile.code} file={selectedFile} setSelectedFile={setSelectedFile} /> */}
                <Textarea code={selectedFile.code} file={selectedFile} />
                {/* {showErrorConsole && <ErrorConsole />} */}
                {showErrorConsole && <DialogBox open={showErrorConsole} title={"Error Console"}></DialogBox>}
            </div>
            {showDialogBox && <DialogBox open={showDialogBox} title={"Upload Code"} >
                <div className="flex flex-col gap-20 width-200 align-items-center">
                    <div>
                        <select id="selectFile">
                            {
                                files.map(value => (
                                    <option key={value.id} value={value.code}>{value.name}.{value.extension}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <button id="btnUpload" onClick={handleFileUpload}>Upload</button>
                    </div>
                </div>

            </DialogBox>}
            {/* {showRunPanel && <RunPanel />} */}
        </div>
    )
}
export default Main