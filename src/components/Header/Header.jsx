import { useEffect, useState } from "react"
import "./Header.css"
import DialogBox from "../Main/DialogBox/DialogBox"
import DocumentationGenerator from "../DocumentationGenerator/DocumentationGenerator"
import { useForm } from "react-hook-form"
import { nanoid } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import { addFile, renameFile } from "../../store/fileSlice"
import { useNavigate, useParams } from "react-router-dom"
import { postFiles, updateFiles } from "../../api/workspace/fileService"


function Header({ handleShowRunPanel }) {
    const [showNewFileDialog, setShowNewFileDialog] = useState(false)
    const [showRenameFileDialog, setShowRenameFileDialog] = useState(false)

    const param = useParams()
    const dispatch = useDispatch()
    const userData = useSelector(state => state.authSlice.userData)
    const navigate = useNavigate()
    const files = useSelector(state => state.fileSlice.files)
    const selectedFile = useSelector(state => state.fileSlice.selectedFile)

    const { register, handleSubmit } = useForm({
        defaultValues: {
            id: nanoid(),
            filename: '',
            extension: '',
            code: '',
            rename: ''
        }
    });



    const handleNewFileDialog = () => {
        setShowNewFileDialog(prev => !prev)
    }

    const handleCreateNewFileForm = async (data) => {
        const file = {
            id: data.id,
            filename: data.filename,
            extension: data.extension,
            code: data.code
        }
        dispatch(addFile(file))
        setShowNewFileDialog(false)
        const response = postFiles(userData.id, param.id, data);
        if (response.status == 200) {
            console.log("File is created!");
        }
    }

    const handleRenameFileDialog = () => {

        setShowRenameFileDialog(prev => !prev)
    }

    const handleRenameFileForm = async (data) => {
        const file = {
            filename: data.filename,
            rename: data.rename
        }
        console.log("handle Rename:", file)
        dispatch(renameFile(file))
        setShowRenameFileDialog(false)
        const response = updateFiles(userData.id, selectedFile.workspaceId, selectedFile.id, { filename: file.rename, extension: selectedFile.extension, code: selectedFile.code })
        console.log(response)
        if (response.status == 200) {
            alert(response.data)
        }
    }

    return (
        <div>
            <header className="flex align-items-center">
                <div className="flex gap-10 mx-10">
                    <div>
                        <b>PS</b>
                    </div>
                    <nav className="flex" style={{ 'zIndex': '5' }}>
                        <div>
                            <div className="nav-item cursor-pointer">File</div>
                            <div className="item-content">
                                <ul>
                                    <li className="cursor-pointer" onClick={handleNewFileDialog}>New File</li>
                                    <li className="cursor-pointer" onClick={handleRenameFileDialog}>Rename File</li>
                                    <li className="cursor-pointer" onClick={() => navigate("/")}>New Workspace</li>
                                    <li className="cursor-pointer" onClick={() => navigate("/")}>Exit</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div className="nav-item cursor-pointer">Edit</div>
                            <div className="item-content">
                                <ul>
                                    {/* <li className="cursor-pointer">Find</li>
                                    <li className="cursor-pointer">Replace</li> */}
                                    <li className="cursor-pointer">Font</li>
                                    <li className="cursor-pointer">Font Size</li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="flex">
                    <h1 className="block" id="nav-title">PixelScript</h1>
                </div>
                <div className="flex gap-10 mx-10">

                    <div>
                        <span className="material-symbols-outlined cursor-pointer" onClick={handleShowRunPanel}>
                            sound_sampler
                        </span>
                    </div>
                    <div>
                        <DocumentationGenerator />
                    </div>
                </div>

            </header>

            {showNewFileDialog &&
                <DialogBox open={showNewFileDialog} title={"Create new file"} >
                    <form onSubmit={handleSubmit(handleCreateNewFileForm)}>
                        <div className="flex flex-col gap-20 width-200 my-30 align-items-center">
                            <div className="flex gap-10">
                                <div className="flex flex-col">
                                    <label htmlFor="filename">File name</label>
                                    <input
                                        id="filename"
                                        placeholder="Enter file name here"
                                        {...register("filename", { required: true })}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="extension">Extension</label>
                                    <select id="extension"
                                        {...register("extension", { required: true })}
                                    >
                                        <option value="java">.java</option>
                                        <option value="py">.py</option>
                                        <option value="cpp">.cpp</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <input type="submit" id="btnNewFile" value="Create"
                                    {...register('code')}
                                    hidden
                                />
                            </div>
                            <div>
                                <input type="submit" id="btnNewFile" value="Create" />
                            </div>
                        </div>
                    </form>
                </DialogBox>
            }

            {showRenameFileDialog &&
                <DialogBox open={showRenameFileDialog} title={"Rename file"} >
                    <form onSubmit={handleSubmit(handleRenameFileForm)}>
                        <div className="flex flex-col gap-20 width-200 my-30 align-items-center">
                            <div className="flex gap-10">
                                <div>
                                    <div className="flex flex-col">
                                        <label htmlFor="selectFile">Select file</label>
                                        <select
                                            id="selectFile"
                                            {...register("filename", { required: true })}
                                        >
                                            {
                                                files.map(value => (
                                                    <option key={value.id} value={value.filename}>{value.filename}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex flex-col">
                                        <label htmlFor="renameFilename">Rename file</label>
                                        <input
                                            id="renameFilename"
                                            placeholder="Enter file name here"
                                            {...register("rename", { required: true })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <input type="submit" id="btnRenameFile" value="Rename" />
                            </div>
                        </div>
                    </form>
                </DialogBox>

            }

        </div>
    )
}
export default Header