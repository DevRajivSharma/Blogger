import React, {useState} from 'react';
import auth from "../../appwrite/auth.js"
import {useDispatch} from "react-redux";
import {login as storeLogin, verifyStatus} from "../../feature/authSlice.js"
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import Input from "../Input.jsx";
import Loader from "../Loader.jsx";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const {register, handleSubmit} = useForm();
    const [rememberMe, setRememberMe] = useState(false);
    const [btnLoader, setBtnLoader] = useState(false)

    const login =  ({email,password}) => {
        setError(null);
        setBtnLoader(true)
        try {
            auth.login({email,password})
                .then(function () {
                    auth.getCurrentUser()
                        .then((userData) => {
                            setBtnLoader(false)
                            if (userData) {
                                dispatch(storeLogin(userData));
                                userData.emailVerification?dispatch((verifyStatus()))
                                    :null;
                                navigate('/');
                            }
                            else {
                                setError('Incorrect email or password')
                            }
                        })
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
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-165 lg:py-0">
                <div
                    className="lg:w-1/4 md:w-1/2.5  rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight  md:text-2xl ">
                            Sign in to your account
                        </h1>

                        <form className="flex flex-col space-y-4 md:space-y-6"
                              onSubmit={handleSubmit(login)} >
                            <div>
                                <Input label={"Your email"}
                                       // type={"email"}
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
                                       />
                            </div>
                            {/*<div className="flex items-center justify-between">*/}
                            {/*    <div className="flex items-start">*/}
                            {/*        <div className="flex items-center h-5">*/}
                            {/*            <input id="remember" aria-describedby="remember" type="checkbox"*/}
                            {/*                   className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"*/}
                            {/*                   onClick={() => setRememberMe(!rememberMe)}*/}
                            {/*                   required=""/>*/}
                            {/*        </div>*/}
                            {/*        <div className="ml-3 text-sm">*/}
                            {/*            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember*/}
                            {/*                me</label>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*    <Link to="/signup"*/}
                            {/*       className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot*/}
                            {/*        password?</Link>*/}
                            {/*</div>*/}

                            <div >
                                <p className=" text-center text-md text-red-600 ">
                                    {error}
                                </p>
                            </div>

                            <button type="submit"
                                    className="w-30 mx-auto  bg-black py-2 px-4
                                    rounded-md">
                                {btnLoader?
                                    <Loader  />
                                    : 'Log in'}
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link to="/signup"
                                                                 className="font-medium text-primary-600 hover:underline text-primary-500">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;