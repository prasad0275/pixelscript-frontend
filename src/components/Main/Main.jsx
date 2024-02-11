import SideBar from "./SideBar/SideBar"
import Editor from "./Editor/Editor"
import "./Main.css"
import RunPanel from "./RunPanel/RunPanel"
import SideMenu from "./SideMenu/SideMenu"
import { useEffect, useState } from "react"
import ErrorConsole from "./ErrorConsole/ErrorConsole"
import DialogBox from "./DialogBox/DialogBox"

import { useDispatch, useSelector } from "react-redux"
import { saveFile } from "../../store/fileSlice"

function Main({ showRunPanel }) {

    //reduxtoolkit
    const files = useSelector(state => state.files)
    const dispatch = useDispatch()
    const [showSideMenu, setShowSideMenu] = useState(false)
    const [showErrorConsole, setShowErrorConsole] = useState(false)
    const [showDialogBox, setShowDialogBox] = useState(false)
    const [selectedFile, setSelectedFile] = useState(files[0])


    const handleShowSideMenu = () => {
        setShowSideMenu(prev => !prev)
    }

    const handleShowDialogBox = () => {
        setShowDialogBox(prev => !prev)
        dispatch(saveFile(selectedFile))
    }


    const handleShowErrorConsole = () => {
        setShowErrorConsole(prev => !prev)
    }

    const handleFileSelection = (file) => {
        setSelectedFile(file)
        // console.log(">",selectedFile);
    }

    const handleFileUpload = () => {
        const selectElement = document.getElementById('selectFile');

        const selectedOption = selectElement.options[selectElement.selectedIndex];

        if (selectedOption) {
            const selectedValue = selectedOption.value;
            const selectedTitle = selectedOption.text;

            // console.log('Selected Title:', selectedTitle);
            // console.log('Selected Value:', selectedValue);

        }
    }


    useEffect(() => {

    }, [selectedFile])

    return (
        <div className="flex main">
            <SideBar handleShowSideMenu={handleShowSideMenu} handleShowDialogBox={handleShowDialogBox} handleShowErrorConsole={handleShowErrorConsole} />
            {showSideMenu && <SideMenu files={files} handleFileSelection={handleFileSelection} />}
            <div className="flex flex-col center">
                <Editor code={selectedFile.code} file={selectedFile} setSelectedFile={setSelectedFile} />
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
            {showRunPanel && <RunPanel />}
        </div>
    )
}
export default Main