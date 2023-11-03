import SideBar from "./SideBar/SideBar"
import Editor from "./Editor/Editor"
import "./Main.css"
import RunPanel from "./RunPanel/RunPanel"
import SideMenu from "./SideMenu/SideMenu"
import { useState } from "react"
import ErrorConsole from "./ErrorConsole/ErrorConsole"
function Main({showRunPanel}){
    const [showSideMenu, setShowSideMenu] = useState(false)
    const [showErrorConsole, setShowErrorConsole] = useState(false)

    const handleShowSideMenu = () => {
        setShowSideMenu(prev => !prev)
    }

    const handleShowErrorConsole = () => {
        setShowErrorConsole(prev => !prev)
    }

    return(
        <div className="flex main">
            <SideBar handleShowSideMenu={handleShowSideMenu} handleShowErrorConsole={handleShowErrorConsole}/>
            {showSideMenu && <SideMenu /> }
            <div className="flex flex-col center">
                <Editor />
                {showErrorConsole && <ErrorConsole />}
            </div>
            {showRunPanel && <RunPanel />}
        </div>
    )
}
export default Main