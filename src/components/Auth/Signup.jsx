import "./Auth.css"

function Signup() {
    return (
        <>
            <div>
                <form action="" className="flex-1 ">
                    <div className="title">
                        <h1>Sign up</h1>
                    </div>
                    <div className="flex align-items-center gap-20 ">
                        <div className="flex align-items-center gap-10 ">
                            <input type="text" name="" id="" placeholder="Email" />
                            <span>Y</span>
                        </div>
                        <div className="flex align-items-center gap-10 ">
                            <input type="text" name="" id="" placeholder="Username" />
                            <span>Y</span>
                        </div>

                    </div>
                    <div className="flex align-items-center gap-20 ">
                        <div className="flex align-items-center gap-10 ">
                            <input type="text" name="" id="" placeholder="Firstname" />
                            <span>Y</span>
                        </div>
                        <div className="flex align-items-center gap-10 ">
                            <input type="text" name="" id="" placeholder="Last name" />
                            <span>Y</span>
                        </div>
                    </div>
                    <div className="flex align-items-center gap-20 ">
                        <div className="flex align-items-center gap-10 ">
                            <input type="password" name="" id="" placeholder="Password" />
                            <span>Y</span>
                        </div>
                        <div className="flex align-items-center gap-10 ">
                            <input type="password" name="" id="" placeholder="Confirm password" />
                            <span>Y</span>
                        </div>
                    </div>
                    <div className="">
                        <input type="submit" value="Sign up" />
                    </div>

                </form>
            </div>
        </>
    )
}

export default Signup