import { useState } from 'react'
import Center from '../components/Center'
import DialogBox from '../components/Main/DialogBox/DialogBox'
import { useNavigate } from 'react-router-dom'
function HomePage() {

    const navigate = useNavigate()

    const [showCreateWorkspaceDialog, setShowCreateWorkspaceDialog] = useState(false)
    const lang = ['Java', 'Python', 'C++', 'C']
    const handleShowCreateWorkspaceDialog = () => {
        setShowCreateWorkspaceDialog(prev => !prev)
    }


    return (
        <>
            {
                showCreateWorkspaceDialog &&
                <DialogBox
                    open={showCreateWorkspaceDialog}
                    title={"Create New Workspace"}
                >

                    <form action="" className="flex flex-col gap-20 mx-30 my-30">
                        <div className="flex align-items-center gap-10 ">
                            <input type="text" name="" id="username" placeholder="Enter workspace name" />
                            <span>Y</span>
                        </div>
                        <div className="flex align-items-center gap-10 ">
                            <textarea name="" id="" cols="70" rows="7" placeholder="Enter description...."></textarea>
                            <span>Y</span>
                        </div>
                        <div>
                            <select id="selectFile">
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
                        <h1>Hello, User</h1>
                    </div>
                    <div className="">
                        <button onClick={handleShowCreateWorkspaceDialog}>Create new workspace</button>
                    </div>
                </div>

                <div className='flex flex-wrap gap-10'>
                    <div className="card">
                        <div className="card-title">Workspace</div>
                        <div className="card-subtitle">This is subtitle</div>
                        <button className="play-button" onClick={() => navigate("/")}>Play</button>
                    </div>
                    <div className="card flex-col gap-10">
                        <div className="card-title">Workspace</div>
                        <div className="card-subtitle">This is subtitle</div>
                        <button className="play-button" onClick={() => navigate("/")}>Play</button>
                    </div>
                    <div className="card flex-col gap-10">
                        <div className="card-title">Workspace</div>
                        <div className="card-subtitle">This is subtitle</div>
                        <button className="play-button" onClick={() => navigate("/")}>Play</button>
                    </div>
                    <div className="card flex-col gap-10">
                        <div className="card-title">Workspace</div>
                        <div className="card-subtitle">This is subtitle</div>
                        <button className="play-button" onClick={() => navigate("/")}>Play</button>
                    </div>
                    <div className="card flex-col gap-10">
                        <div className="card-title">Workspace</div>
                        <div className="card-subtitle">This is subtitle</div>
                        <button className="play-button" onClick={() => navigate("/")}>Play</button>
                    </div>
                    <div className="card flex-col gap-10">
                        <div className="card-title">Workspace</div>
                        <div className="card-subtitle">This is subtitle</div>
                        <button className="play-button" onClick={() => navigate("/")}>Play</button>
                    </div>
                    <div className="card flex-col gap-10">
                        <div className="card-title">Workspace</div>
                        <div className="card-subtitle">This is subtitle</div>
                        <button className="play-button" onClick={() => navigate("/")}>Play</button>
                    </div>

                </div>
            </div>

        </>
    )
}

export default HomePage