import "./Auth.css"

function Login() {
    return (

        <form action="" className="flex-1">
            <div className="title">
                <h1>Login</h1>
            </div>
            <div className="flex align-items-center gap-10 ">
                <input type="text" name="" id="username" placeholder="Username or email" />
                <span>Y</span>
            </div>
            <div className="flex align-items-center gap-10 ">
                <input type="password" name="" id="password" placeholder="Password" />
                <span>Y</span>
            </div>
            <div className="">
                <input type="submit" value="Login" />
            </div>

        </form>

    )
}

export default Login