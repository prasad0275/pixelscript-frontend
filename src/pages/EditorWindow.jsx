import { useState } from "react"
import Header from "../components/Header/Header"
import Main from "../components/Main/Main"
import RunPanel from "../components/Main/RunPanel/RunPanel"
import DialogBox from "../components/Main/DialogBox/DialogBox"
function EditorWindow() {
    const [showRunPanel, setShowRunPanel] = useState(false)

    const handleShowRunPanel = () => {
        setShowRunPanel((prev) => !prev)
    }

    return (
        <>
            <Header handleShowRunPanel={handleShowRunPanel} />
            <Main showRunPanel={showRunPanel} />


            {showRunPanel &&
                <DialogBox open={showRunPanel} title={'Run your code'}>
                    <RunPanel />
                </DialogBox>
            }
        </>
    )
}
export default EditorWindow