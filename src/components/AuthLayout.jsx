import { useState, useEffect } from "react"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useNavigate } from "react-router-dom"
import { validateToken } from "../api/auth/authService"

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector((state) => state.authSlice.status)
    const auth = useSelector((state) => state.authSlice)
    // console.log("AuthLayout :: Protected :: auth : ", auth)


    useEffect(() => {
        const token = localStorage.getItem("token")
        if (authentication && authStatus !== authentication) {
            navigate("/login")
        }
        else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }
        // if(authentication && token === null){
        //     navigate("/login")
        // }
        setLoader(false)
    }, [authStatus, navigate, authentication])

    useEffect(() => {
        setLoader(false)
    }, [])

    return loader ? <h1>Loading...</h1> : <>{children}</>

}