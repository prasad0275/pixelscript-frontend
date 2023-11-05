import SideBar from "./SideBar/SideBar"
import Editor from "./Editor/Editor"
import "./Main.css"
import RunPanel from "./RunPanel/RunPanel"
import SideMenu from "./SideMenu/SideMenu"
import { useState } from "react"
import ErrorConsole from "./ErrorConsole/ErrorConsole"
import { useSelector } from "react-redux"
function Main({showRunPanel}){
    
    const files = useSelector(state => state.files)

    const [showSideMenu, setShowSideMenu] = useState(false)
    const [showErrorConsole, setShowErrorConsole] = useState(false)    
    const [selectedFile, setSelectedFile] = useState({
        id : 1,
        name : "First.java",
        code : "Class First{\n public static void main(String args[]){\n \n}\n",
    })


    const handleShowSideMenu = () => {
        setShowSideMenu(prev => !prev)
    }

    const handleShowErrorConsole = () => {
        setShowErrorConsole(prev => !prev)
    }

    const handleFileSelection = (file) => {
        setSelectedFile(file)
        console.log(">",selectedFile);
    }

    

    return(
        <div className="flex main">
            <SideBar handleShowSideMenu={handleShowSideMenu} handleShowErrorConsole={handleShowErrorConsole}/>
            {showSideMenu && <SideMenu files={files} handleFileSelection={handleFileSelection}/> }
            <div className="flex flex-col center">
                <Editor code={selectedFile.code}/>
                {showErrorConsole && <ErrorConsole />}
            </div>
            {showRunPanel && <RunPanel />}
        </div>
    )
}
export default Main