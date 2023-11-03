import { useState } from "react"
import Header from "../components/Header/Header"
import Main from "../components/Main/Main"
function EditorWindow(){
    const [showRunPanel, setShowRunPanel] = useState(false)

    const handleShowRunPanel = () => {
        setShowRunPanel((prev) => !prev)
    }

    return(
        <>
        <Header handleShowRunPanel={handleShowRunPanel}/>
        <Main showRunPanel={showRunPanel}/>
        </>
    )
}
export default EditorWindow