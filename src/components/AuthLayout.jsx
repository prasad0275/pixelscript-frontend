import { useState,useEffect } from "react"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useNavigate } from "react-router-dom"

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    // const authStatus = useSelector((state) => state.auth.status)

    // useEffect(()=>{
    //     // if(authentication && authStatus !== authentication){
    //     //     navigate("/login")
    //     // }
    //     // else if(!authentication && authStatus !== authentication){
    //     //     navigate("/")
    //     // }
    //     setLoader(false)
    // },[authStatus,navigate,authentication])
    useEffect(()=>{
        setLoader(false)
    },[])
    return loader? <h1>Loading...</h1> : <>{children}</>

}