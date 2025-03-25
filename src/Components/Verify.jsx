import React, {useEffect} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import auth from '../appwrite/auth.js'
import {useDispatch} from "react-redux";
import {verifyStatus,login} from "../feature/authSlice.js";
function Verify() {

    const [params,setParams] = useSearchParams();
    const userId = params.get("userId").trim();
    const secret =  params.get("secret").trim();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log(params);
    console.log("userId ", userId);
    console.log("secret", secret);

    useEffect(() => {
        if (userId && secret) {
            try {
            auth.updateVerification({userId,secret})
                .then((response) => {
                    auth.getCurrentUser()
                        .then((userData) => {
                            dispatch(login(userData));
                            dispatch(verifyStatus());
                        })
                    console.log(response);
                    navigate("/");
                }, function (error) {
                    throw error// Failure
                });
            }
            catch (error) {
                throw error
            }
        }
    })

    return (
        <div></div>
    );
}

export default Verify;