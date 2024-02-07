import SideBar from "./SideBar/SideBar"
import Editor from "./Editor/Editor"
import "./Main.css"
import RunPanel from "./RunPanel/RunPanel"
import SideMenu from "./SideMenu/SideMenu"
import { useEffect, useState } from "react"
import ErrorConsole from "./ErrorConsole/ErrorConsole"
import { useSelector } from "react-redux"
import DialogBox from "./DialogBox/DialogBox"
function Main({ showRunPanel }) {

    //reduxtoolkit
    const files = useSelector(state => state.files)

    const [showSideMenu, setShowSideMenu] = useState(false)
    const [showErrorConsole, setShowErrorConsole] = useState(false)
    const [showDialogBox, setShowDialogBox] = useState(false)
    const [selectedFile, setSelectedFile] = useState({
        id: 1,
        name: "demo.java",
        code: "===============| Create or open you file |========================",
    })


    const handleShowSideMenu = () => {
        setShowSideMenu(prev => !prev)
    }

    const handleShowDialogBox = () => {
        setShowDialogBox(prev => !prev)
    }

    const handleCloseModal = () => {
        setShowDialogBox(false);
        setShowErrorConsole(false);
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
    
            console.log('Selected Title:', selectedTitle);
            console.log('Selected Value:', selectedValue);
    
        }
    }

    const handleSaveFile = () => {
        console.log("Save")
    }

    useEffect(() => {

    }, [selectedFile])

    return (
        <div className="flex main">
            <SideBar handleShowSideMenu={handleShowSideMenu} handleShowDialogBox={handleShowDialogBox} handleShowErrorConsole={handleShowErrorConsole} />
            {showSideMenu && <SideMenu files={files} handleFileSelection={handleFileSelection} />}
            <div className="flex flex-col center">
                <Editor code={selectedFile.code} />
                {/* {showErrorConsole && <ErrorConsole />} */}
                {showErrorConsole && <DialogBox open={showErrorConsole} title={"Error Console"} handleCloseModal={handleCloseModal}></DialogBox>}
            </div>
            {showDialogBox && <DialogBox open={showDialogBox} title={"Upload Code"} handleCloseModal={handleCloseModal}>
                <div className="flex flex-col gap-20 width-200 align-items-center">
                    <div>
                        <select id="selectFile">
                            {
                                files.map(value => (
                                    <option key={value.id} value={value.code}>{value.name}</option>
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