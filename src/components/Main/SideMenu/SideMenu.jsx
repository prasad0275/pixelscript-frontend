import "./SideMenu.css"
import { useSelector } from "react-redux"
function SideMenu({files,handleFileSelection}){
    return (
        <div id="side-menu" className="">
            <ul>
                <li>Document.java</li>
                <li>Class.java</li>
                {
                    files.map(value => (
                        <div key={value.id} onClick={()=>{console.log(value.code);handleFileSelection(value)}}><li>{value.name}</li></div>
                    ))
                }
            </ul>
        </div>
    )
}
export default SideMenu