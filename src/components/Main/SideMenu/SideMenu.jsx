import "./SideMenu.css"
import { useSelector } from "react-redux"
function SideMenu({files,handleFileSelection}){
    return (
        <div id="side-menu" className="">
            <ul>
                {
                    files.map(value => (
                        <div key={value.id} onClick={()=>{handleFileSelection(value)}}><li>{value.name}.{value.extension}</li></div>
                    ))
                }
            </ul>
        </div>
    )
}
export default SideMenu