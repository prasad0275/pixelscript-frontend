import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth/authService";
import { login as loginSlice } from '../../store/authSlice'
import "./Auth.css"
import { useDispatch } from "react-redux";

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm({
        defaultValues: {
            username: '',
            password: '',
        }
    });

    const handleLoginForm = async (data) => {
        // console.log("handleLoginForm :: data: ", data)
        const response = await login(data);
        // console.log("handleLoginForm :: response : ", response)
        if (response.status == 200) {
            // console.log("Message : ", response.data.message);
            // console.log("Token : ", response.data.token);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("status", 'true')
            const userData = { userData: response.data.user };
            dispatch(loginSlice(userData))
            alert("Login successfully done");
            navigate('/');
        }
        else {
            alert("Invalid credentials");
        }
    }

    return (

        <form action="" className="flex-1" onSubmit={handleSubmit(handleLoginForm)}>
            <div className="title">
                <h1>Login</h1>
            </div>
            <div className="flex align-items-center gap-10 ">
                <input type="text" name="" id="username" placeholder="Username"
                    {...register("username")}
                />
                {/* <span>Y</span> */}
            </div>
            <div className="flex align-items-center gap-10 ">
                <input type="password" name="" id="password" placeholder="Password"
                    {...register("password")}
                />
                {/* <span>Y</span> */}
            </div>
            <div className="">
                <input type="submit" value="Login" />
            </div>
            <div>
                <span>Don't have an account? <a className="cursor-pointer" onClick={() => (navigate('/signup'))}>Sign Up</a></span>
            </div>

        </form>

    )
}

export default Login