import { useEffect, useState } from "react"
import Header from "../components/Header/Header"
import Main from "../components/Main/Main"
import RunPanel from "../components/Main/RunPanel/RunPanel"
import DialogBox from "../components/Main/DialogBox/DialogBox"
import { useParams } from "react-router-dom"
import { getFiles } from "../api/workspace/fileService"
import { useDispatch, useSelector } from "react-redux"
import { addFiles } from "../store/fileSlice"
function EditorWindow() {

    
    const param = useParams()
    const dispatch = useDispatch();
    const userData = useSelector(state => state.authSlice.userData)
    const [showRunPanel, setShowRunPanel] = useState(false)


    const handleShowRunPanel = () => {
        setShowRunPanel((prev) => !prev)
    }

    useEffect(() => {
        const response = loadFiles();
    },[])

    const loadFiles = async () => {
        const response = await getFiles(userData.id, param.id);
        console.log("EditorWindow :: loadFiles : response : ",response)
        if(response.status == 200){
            dispatch(addFiles(response.data));
        }
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