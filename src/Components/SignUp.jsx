import React, {useState} from 'react';
import auth from "../../appwrite/auth.js"
import {useDispatch} from "react-redux";
import {login as storeLogin} from "../../feature/authSlice.js"
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import Input from "../Input.jsx";

function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const {register, handleSubmit} = useForm();

    const signup = ({email, password, name}) => {
        setError(null);
        try {
            auth.createAccount({email, password, name})
                .then(() => {
                    auth.getCurrentUser()
                        .then((userData) => {
                            dispatch(storeLogin(userData));
                        })
                    navigate("/");
                }, function (error) {
                    setError(error) // Failure
                });
        }
        catch (error) {
            setError(error)
        }
    }
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6"
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
                                               className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                               required=""/>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember
                                            me</label>
                                    </div>
                                </div>
                                <a href="#"
                                   className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot
                                    password?</a>
                            </div>
                            {error &&
                                <div>
                                    <p>error</p>
                                </div>
                            }
                            <button type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign
                                in
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account ? <Link to="/login"
                                                              className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignUp;