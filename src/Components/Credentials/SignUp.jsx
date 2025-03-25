import React, {useState} from 'react';
import auth from "../../appwrite/auth.js"
import {useDispatch} from "react-redux";
import {login as storeLogin} from "../../feature/authSlice.js"
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import Input from "../Input.jsx";
import Loader from "../Loader.jsx";

function SignUp() {

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const {register, handleSubmit} = useForm();
    const [btnLoader, setBtnLoader] = useState(false)

    const signup = ({email, password, name}) => {
        setBtnLoader(true)
        setError(null);
        try {
            auth.createAccount({email, password, name})
                .then(() => {
                    setBtnLoader(false)
                    navigate("/checkMail");
                }, function (error) {
                    setError(error) // Failure
                });
        }
        catch (error) {
            setError(error)
        }
    }
    return (
        <section className=" bg-[#212121]">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div
                    className="w-full  rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6 flex  flex-col"
                              onSubmit={handleSubmit(signup)} >
                            <div>
                                <Input label={"Your Name"}
                                       type={"text"}
                                       placeholder={"Your Name"}
                                       {...register("name",{
                                           required: true,
                                       })}
                                />
                            </div>
                            <div>
                                <Input label={"Your email"}
                                       type={"email"}
                                       placeholder={"Your email"}
                                       {...register("email",{
                                           required: true,
                                           validate: {
                                               matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                   "Email address must be a valid address",
                                           }

                                       })}
                                />
                            </div>
                            <div>
                                <Input label={"password"}
                                       type="password"
                                       placeholder={"•••••••"}
                                       {...register("password",{
                                           required: true,
                                       })}
                                       required />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox"
                                               className="w-4 h-4 border  rounded  focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                                               required=""/>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 ">Remember
                                            me</label>
                                    </div>
                                </div>
                                <a href="#"
                                   className="text-sm font-medium text-primary-600 hover:underline text-primary-500">Forgot
                                    password?</a>
                            </div>
                            {error &&
                                <div>
                                    <p>error</p>
                                </div>
                            }
                            <button type="submit"
                                    className="w-50 mx-auto  bg-black py-2 px-4
                                    rounded-md">
                                {btnLoader?
                                    <Loader  />
                                    : 'Sign in'}
                            </button>
                            <p className="text-sm font-light text-gray-500 ">
                                Already have an account ? <Link to="/login"
                                                              className="font-medium text-primary-600 hover:underline text-primary-500">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUp;