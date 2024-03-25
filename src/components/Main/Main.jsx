import SideBar from "./SideBar/SideBar"
import Editor from "./Editor/Editor"
import "./Main.css"
import RunPanel from "./RunPanel/RunPanel"
import SideMenu from "./SideMenu/SideMenu"
import { useEffect, useState } from "react"
import ErrorConsole from "./ErrorConsole/ErrorConsole"
import DialogBox from "./DialogBox/DialogBox"

import { compile as compileJava, run as runJava } from "../../api/compile/javaService";
import { compile as compileCPP, run as runCPP } from "../../api/compile/cppService";
import { compile as interpretPython, run as runPython } from "../../api/compile/pythonService";

import { useDispatch, useSelector } from "react-redux"
import { removeFile, saveFile, selectFile } from "../../store/fileSlice"
import Textarea from "./Editor/Textarea"
import { nanoid } from "@reduxjs/toolkit"
import { useForm } from "react-hook-form"
import { deleteFiles, updateFiles } from "../../api/workspace/fileService"
import { useNavigate, useParams } from "react-router-dom"

function Main({ showRunPanel }) {

    //reduxtoolkit
    const files = useSelector(state => state.fileSlice.files)
    const file = useSelector(state => state.fileSlice.selectedFile);
    const userData = useSelector(state => state.authSlice.userData)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const param = useParams()
    const [output, setOutput] = useState();
    const [outputLoader, setOutputLoader] = useState(false);
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


    const handleShowErrorConsole = async () => {
        setShowErrorConsole(prev => !prev)
        const data = {
            filename: file.filename,
            extension: file.extension,
            code: file.code,
            input: ''
        }
        console.log("RunPanel :: HandleRunBtn ", data);
        if (file.extension == 'java') {
            setOutputLoader(true);
            const response = await compileJava(data).finally(() => (setOutputLoader(false)));
            if (response.status == 200) {
                console.log(response.data.output);
                setOutput(response.data.output + "\n\n ");
                setOutputLoader(false)
            }
            else {
                setOutput(response.message + "\n\n");
            }
        }
        else if (file.extension == 'cpp') {
            setOutputLoader(true);
            const response = await compileCPP(data).finally(() => (setOutputLoader(false)));;
            if (response.status == 200) {
                setOutput(response.data.output + "\n\n ");
                setOutputLoader(false);
            }
            else {
                setOutput(response.message + "\n\n ");
            }
        }
        else if (file.extension == 'py') {
            setOutputLoader(true);
            const response = await interpretPython(data).finally(() => (setOutputLoader(false)));;
            if (response.status == 200) {
                setOutput(response.data.output + "\n\n");
                setOutputLoader(false);
            }
            else {
                setOutput(response.message + "\n\n ");
            }
        }
        console.log("Output :  ", output)

    }

    const handleFileSelection = (file) => {
        dispatch(selectFile(file))
    }

    const handleFileUpload = async (data) => {
        const id = data.id;
        const file = files.find((value) => value.id == id)
        console.log(file)

        const response = await updateFiles(userData.id, file.workspaceId, id,
            { filename: file.filename, extension: file.extension, code: file.code });

        if (response.status == 200) {
            alert("Code is successfully pushed!");
        }
    }

    const handleAllFileUpload = async () => {
        console.log(files)

        try {
            files.map(async (file) => {
                // console.log(file);
                const response = await updateFiles(userData.id, file.workspaceId, file.id,
                    { filename: file.filename, extension: file.extension, code: file.code });

                if (response.status == 200) {
                    // alert("File : "+file.filename+" is uploaded");
                }
                else {
                    alert("Error :: File : " + file.filename + " is not uploaded")
                    throw Error("Error :: File : " + file.filename + " is not uploaded");
                }
                
            })
            alert("All files are uploaded!")
        }
        catch {

        }

        // const response = await updateFiles(userData.id, file.workspaceId, id,
        //     { filename: file.filename, extension: file.extension, code: file.code });

        // if (response.status == 200) {
        //     alert("Code is successfully pushed!");
        // }
    }

    const handleFileDelete = async (workspaceId, fileId) => {
        console.log("handleFileDelete : ", workspaceId, fileId)
        if (confirm("Do you want to delete file?")) {
            deleteFiles(userData.id, workspaceId, fileId)
            dispatch(removeFile(fileId))
            console.log("Deleted");
        }
        else {
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
                {showErrorConsole &&
                    <DialogBox open={showErrorConsole} title={"Error Console"}>
                        <textarea className="textarea textarea-output" name="" id="" cols="50" rows="10"
                            value={output}
                        ></textarea>
                    </DialogBox>
                }
            </div>
            {showDialogBox && <DialogBox open={showDialogBox} title={"Push code to database"} >
                <div className="flex flex-col gap-20 width-200 align-items-center">
                    <form className="flex gap-20 width-200 justify-content-center align-items-center" action=""
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
                            <button type="submit" id="btnUpload">Push</button>
                        </div>
                    </form>
                    <hr width="100%" />
                    <div>
                        <button onClick={handleAllFileUpload}>Push All</button>
                    </div>
                </div>

            </DialogBox>}
            {/* {showRunPanel && <RunPanel />} */}
        </div>
    )
}
export default Main