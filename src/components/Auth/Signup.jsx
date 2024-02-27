import "./Auth.css"
import { signup } from "../../api/auth/authService";
import { useForm } from "react-hook-form";
import { nanoid } from "@reduxjs/toolkit";

function Signup() {

    const { register, handleSubmit } = useForm({
        defaultValues: {
            id: nanoid(),
            username: '',
            email: '',
            firstname: '',
            lastname: '',
            password: '',
        }
    });

    const handleSignupForm = async (data) => {
        console.log("Form submitted!")
        const user = {
            name: data.username,
        }
        console.log(data);
        signup(data);
    }

    return (
        <>
            <div>
                <form className="flex-1" onSubmit={handleSubmit(handleSignupForm)}>
                    <div className="title">
                        <h1>Sign up</h1>
                    </div>
                    <div className="flex align-items-center gap-20 ">
                        <div className="flex align-items-center gap-10 ">
                            <input type="text" placeholder="Username"
                                {...register("username")} />
                            <span>Y</span>
                        </div>
                        <div className="flex align-items-center gap-10 ">
                            <input {...register("email")} type="text" id="email" placeholder="Email" />
                            <span>Y</span>
                        </div>

                    </div>
                    <div className="flex align-items-center gap-20 ">
                        <div className="flex align-items-center gap-10 ">
                            <input  {...register("firstname")} type="text" placeholder="Firstname" />
                            <span>Y</span>
                        </div>
                        <div className="flex align-items-center gap-10 ">
                            <input  {...register("lastname")} type="text" placeholder="Last name" />
                            <span>Y</span>
                        </div>
                    </div>
                    <div className="flex align-items-center gap-20 ">
                        <div className="flex align-items-center gap-10 ">
                            <input  {...register("password")} type="password" id="password" placeholder="Password" />
                            <span>Y</span>
                        </div>
                        <div className="flex align-items-center gap-10 ">
                            <input type="password"  id="confirm-password" placeholder="Confirm password" />
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