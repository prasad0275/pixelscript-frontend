import { useEffect, useState } from 'react'
import Center from '../components/Center'
import DialogBox from '../components/Main/DialogBox/DialogBox'
import { useNavigate } from 'react-router-dom'
import { getWorkspaces, postWorkspaces } from '../api/workspace/workspaceService'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { logout } from '../store/authSlice'


function HomePage({ }) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userData = useSelector(state => state.authSlice.userData)
    const [showCreateWorkspaceDialog, setShowCreateWorkspaceDialog] = useState(false)
    const [workspaces, setWorkspaces] = useState([]);

    const lang = ['Java', 'Python', 'C++', 'C']

    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: '',
            description: '',
            type: ''
        }
    })

    useEffect(() => {
        console.log(userData)
        loadWorkspace();
    }, [showCreateWorkspaceDialog])

    const loadWorkspace = async () => {
        const response = await getWorkspaces(userData.id);
        if (response.status == 200) {
            setWorkspaces(response.data);
            console.log("Workspace : ", workspaces)
        }
    }



    const handleShowCreateWorkspaceDialog = () => {
        setShowCreateWorkspaceDialog(prev => !prev)
    }

    const handleForm = async (data) => {
        const response = await postWorkspaces(userData.id, data);
        console.log("HomePage :: handleForm :: response : ", response)
        setShowCreateWorkspaceDialog(false);
    }

    const handleLogout  = () => {
        navigate("/login")
        dispatch(logout())
    }

    return (
        <>
            {
                showCreateWorkspaceDialog &&
                <DialogBox
                    open={showCreateWorkspaceDialog}
                    title={"Create New Workspace"}
                >

                    <form action="" className="flex flex-col gap-20 mx-30 my-30" onSubmit={handleSubmit(handleForm)}>
                        <div className="flex align-items-center gap-10 ">
                            <input type="text" name="" id="username" placeholder="Enter workspace name"
                                {...register("name")}
                            />
                            {/* <span>Y</span> */}
                        </div>
                        <div className="flex align-items-center gap-10 ">
                            <textarea name="" id="" cols="70" rows="7" placeholder="Enter description...."
                                {...register("description")}
                            ></textarea>
                            {/* <span>Y</span> */}
                        </div>
                        <div>
                            <select id="selectFile"
                                {...register("type")}
                            >
                                {
                                    lang.map(value => (
                                        <option key={value} value={value}>{value}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="">
                            <input type="submit" value="Create Workspace" />
                        </div>

                    </form>

                </DialogBox >
            }
            <div className='mx-50'>
                <div className="flex flex-wrap gap-10 my-10 align-items-center space-between">
                    <div className="title">
                        <h1>Hello, {userData.firstname + " " + userData.lastname}</h1>
                    </div>
                    <div className="flex gap-10">
                        <button onClick={handleShowCreateWorkspaceDialog}>Create new workspace</button>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>

                <div className='flex flex-wrap gap-10'>

                    {
                        workspaces.map((value) => (
                            <div className="card" key={value.id}>
                                <div className="card-title">{value.name}</div>
                                <div className="card-subtitle">{value.description}</div>
                                <button className="play-button" onClick={() => navigate(`/workspace/${value.id}`)}>Play</button>
                            </div>

                        ))
                    }



                    {workspaces.length > 0 ? '' : <div className="card flex-col gap-10">
                        <div className="card-title">No Workspace</div>
                        <div className="card-subtitle">Create one new workspace</div>
                    </div>}



                </div>
            </div>

        </>
    )
}

export default HomePage