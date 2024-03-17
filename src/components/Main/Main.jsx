import SideBar from "./SideBar/SideBar"
import Editor from "./Editor/Editor"
import "./Main.css"
import RunPanel from "./RunPanel/RunPanel"
import SideMenu from "./SideMenu/SideMenu"
import { useEffect, useState } from "react"
import ErrorConsole from "./ErrorConsole/ErrorConsole"
import DialogBox from "./DialogBox/DialogBox"

import { useDispatch, useSelector } from "react-redux"
import { removeFile, saveFile, selectFile } from "../../store/fileSlice"
import Textarea from "./Editor/Textarea"
import { nanoid } from "@reduxjs/toolkit"
import { useForm } from "react-hook-form"
import { deleteFiles, updateFiles } from "../../api/workspace/fileService"
import { useNavigate } from "react-router-dom"

function Main({ showRunPanel }) {

    //reduxtoolkit
    const files = useSelector(state => state.fileSlice.files)
    const file = useSelector(state => state.fileSlice.selectedFile);
    const userData = useSelector(state => state.authSlice.userData)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showSideMenu, setShowSideMenu] = useState(false)
    const [showErrorConsole, setShowErrorConsole] = useState(false)
    const [showDialogBox, setShowDialogBox] = useState(false)
    const [selectedFile, setSelectedFile] = useState({
        id: nanoid(),
        name: "First",
        extension: 'java',
        code: "class First{\n public static void main(String args[]){\n \n }\n}",
    })

    const { register, handleSubmit } = useForm({
        defaultValues: {
            id: ''
        }
    })


    const handleShowSideMenu = () => {
        setShowSideMenu(prev => !prev)
    }

    const handleShowDialogBox = () => {
        setShowDialogBox(prev => !prev)
    }


    const handleShowErrorConsole = () => {
        navigate('/doc')
        // setShowErrorConsole(prev => !prev)
    }

    const handleFileSelection = (file) => {
        dispatch(selectFile(file))
    }

    const handleFileUpload = async (data) => {
        const id = data.id;
        const file = files.find((value) => value.id == id)
        console.log(file)

        const response = updateFiles(userData.id, file.workspaceId, id,
            { filename: file.name, extension: file.extension, code: file.code });

        if (response.status == 200) {
            alert("Code is successfully uploaded!");
        }
    }

    const handleFileDelete = async (workspaceId, fileId) => {
        console.log("handleFileDelete : ", workspaceId, fileId)
        if(confirm("Do you want to delete file?")){
            deleteFiles(userData.id, workspaceId, fileId)
            dispatch(removeFile(fileId))
            console.log("Deleted");
        }
        else{
            console.log("Not Deleted")
        }
    }

    useEffect(() => {

    }, [selectedFile])

    return (
        <div className="flex main">
            <SideBar handleShowSideMenu={handleShowSideMenu} handleShowDialogBox={handleShowDialogBox} handleShowErrorConsole={handleShowErrorConsole} />
            {showSideMenu && <SideMenu files={files} handleFileSelection={handleFileSelection} handleFileDelete={handleFileDelete} />}
            <div className="flex flex-col center">
                {/* <Editor code={selectedFile.code} file={selectedFile} setSelectedFile={setSelectedFile} /> */}
                <Textarea />
                {/* {showErrorConsole && <ErrorConsole />} */}
                {showErrorConsole && <DialogBox open={showErrorConsole} title={"Error Console"}></DialogBox>}
            </div>
            {showDialogBox && <DialogBox open={showDialogBox} title={"Upload Code"} >
                <div>
                    <form className="flex flex-col gap-20 width-200 align-items-center" action=""
                        onSubmit={handleSubmit(handleFileUpload)}>
                        <div>
                            <select id="selectFile"
                                {...register("id")}
                            >
                                {
                                    files.map(value => (
                                        <option key={value.id} value={value.id}>{value.filename}.{value.extension}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <button type="submit" id="btnUpload">Upload</button>
                        </div>
                    </form>
                </div>

            </DialogBox>}
            {/* {showRunPanel && <RunPanel />} */}
        </div>
    )
}
export default Main