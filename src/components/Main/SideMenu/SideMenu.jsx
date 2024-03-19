import "./SideMenu.css"
import { useSelector } from "react-redux"
function SideMenu({ files, handleFileSelection, handleFileDelete }) {
    return (
        <div id="side-menu" className="">
            <ul>
                {
                    files.map(value => (
                        <div className="flex gap-10 space-between" key={value.id} onClick={() => { handleFileSelection(value) }}><li>{value.filename}.{value.extension}</li>
                            <span className="material-symbols-outlined cursor-pointer"
                                onClick={() => handleFileDelete(value.workspaceId, value.id)}
                                style={{ color: '#ec407a' }}
                            >
                                delete
                            </span>
                        </div>
                    ))
                }
            </ul>
        </div>
    )
}
export default SideMenu