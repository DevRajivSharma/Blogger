import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function EmailAuthLayout({children}) {
    const navigate = useNavigate()
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if (!authStatus) {
            navigate('/')
        }
    })
    return (
            <div></div>
    );
}

export default EmailAuthLayout;