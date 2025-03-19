import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "react-router-dom";
import Loader from "../Loader.jsx";
function AuthLayout({
    children,
    authenticated = true
   })
{
    const [loader, setLoader] = useState(true)
    const navigate = useNavigation();
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        if (authenticated && authStatus !== authenticated) {
                navigate('/login');
        }else if (!authenticated && authStatus !== authenticated) {
                navigate('/');
        }
        setLoader(false);
    }, [navigate,authenticated,loader,authStatus]);
    useEffect(() => {

    })
    return loader ? <Loader /> : {children};
}

export default AuthLayout;