import "./SideBar.css"
function SideBar({handleShowSideMenu, handleShowDialogBox, handleShowErrorConsole}){
    return (
             <div id="sidebar" className="flex flex-col">
            <div id="files" >
                <span className="material-symbols-outlined cursor-pointer"
                onClick={handleShowSideMenu}>
                    note
                </span>
            </div>
            <div>
                <span className="material-symbols-outlined cursor-pointer"
                onClick={handleShowDialogBox}>
                    cloud_upload
                </span>
            </div>
            <div>
                <span className="material-symbols-outlined cursor-pointer"
                onClick={handleShowErrorConsole}>
                    running_with_errors
                </span>
            </div>
        </div>
    )
}
export default SideBar