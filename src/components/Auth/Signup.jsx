import "./Auth.css"
import { signup } from "../../api/auth/authService";
import { useForm } from "react-hook-form";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

function Signup() {
    const [validUsername, setValidUsername] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [validForm, setValidForm] = useState(false)

    const navigate = useNavigate();
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

    var emailRegex = "/^\S+@\S+\.\S+$/";

    function isValidEmail(email) {
        const simpleEmailRegex = /^\S+@\S+\.\S+$/;
        console.log(!!email.match(simpleEmailRegex));
        setValidEmail(!!email.match(simpleEmailRegex));
    }

    function isValidPassword(password) {
        setPassword(password)
        if (password.length < 8) {
            return setValidPassword(false);
        }
        if (!/[A-Z]/.test(password)) {
            return setValidPassword(false);
        }
        if (!/[a-z]/.test(password)) {
            return setValidPassword(false);
        }
        if (!/\d/.test(password)) {
            return setValidPassword(false);
        }
        return setValidPassword(true);
    }


    const handleSignupForm = async (data) => {
        console.log("Form submitted!")
        const user = {
            name: data.username,
        }
        const response = await signup(data);
        console.log("response :", response)
        console.log("response data:", response.data)
        console.log("response status code :", response.status)
        console.log("response message :", response.data.message)

        if (response.status == 201) {
            alert("You have registered successfully. Please proceed to login.");
            navigate("/login");
        }
        else {
            alert("Oops! Username or email already exists. Please try again with different username.");
        }
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
                                {...register("username")}
                                onChange={(e) => (setValidUsername(e.target.value.length > 5))}
                            />
                            <span>{validUsername ? <span class="material-symbols-outlined" style={{ 'color': 'green' }}>
                                check
                            </span> : <span class="material-symbols-outlined" style={{ 'color': 'red' }}>
                                close
                            </span>}</span>
                        </div>
                        <div className="flex align-items-center gap-10 ">
                            <input {...register("email")} type="text" id="email" placeholder="Email"
                                onChange={(e) => (isValidEmail(e.target.value))}
                            />
                            <span>{validEmail ? <span class="material-symbols-outlined" style={{ 'color': 'green' }}>
                                check
                            </span> : <span class="material-symbols-outlined" style={{ 'color': 'red' }}>
                                close
                            </span>}</span>
                        </div>

                    </div>
                    <div className="flex align-items-center gap-20 ">
                        <div className="flex align-items-center gap-10 ">
                            <input  {...register("firstname")} type="text" placeholder="Firstname"

                            />
                            {/* <span>{username.length > 5 ? 'Y' : 'N'}</span> */}
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </div>
                        <div className="flex align-items-center gap-10 ">
                            <input  {...register("lastname")} type="text" placeholder="Last name"

                            />
                            {/* <span>{username.length > 5 ? 'Y' : 'N'}</span> */}
                            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </div>
                    </div>
                    <div className="flex align-items-center gap-20 ">
                        <div className="flex align-items-center gap-10 ">
                            <input  {...register("password")} type="password" id="password" placeholder="Password"
                                onChange={(e) => (isValidPassword(e.target.value))}
                            />
                            <span>{validPassword ? <span class="material-symbols-outlined" style={{ 'color': 'green' }}>
                                check
                            </span> : <span class="material-symbols-outlined" style={{ 'color': 'red' }}>
                                close
                            </span>}</span>
                        </div>
                        <div className="flex align-items-center gap-10 ">
                            <input type="password" id="confirm-password" placeholder="Confirm password"
                                onChange={(e) => (setValidConfirmPassword(e.target.value === password))}
                            />
                            <span>{validConfirmPassword ? <span class="material-symbols-outlined" style={{ 'color': 'green' }}>
                                check
                            </span> : <span class="material-symbols-outlined" style={{ 'color': 'red' }}>
                                close
                            </span>}</span>
                        </div>
                    </div>
                    <div style={{ 'width': '600px', 'textAlign': 'justify' }}>
                        <span>{!validPassword && `Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one special character and one digit.`}
                        </span>
                    </div>
                    <div className="">
                        {
                            (validUsername && validEmail && validPassword && validConfirmPassword) ? <input type="submit" value="Sign up" /> : <input type="submit" value="Sign up" disabled />
                        }
                    </div>

                    <div>
                        <span>Already have an account? <a className="cursor-pointer" onClick={() => (navigate('/login'))}>Login</a></span>
                    </div>


                </form>
            </div>
        </>
    )
}

export default Signup