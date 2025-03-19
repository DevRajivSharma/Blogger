import React from 'react';
import {useDispatch} from "react-redux";
import {logout} from "../../feature/authSlice.js";
import auth from "../../appwrite/auth.js";


function Logout() {
    const dispatch = useDispatch();
    function OnLogout(){
        auth.logout()
            .then(()=>{
                dispatch(logout())
            })
    }
    return (
        <div>
            <button
                className="btn bg-red-600 p-2 rounded-sm"
                onClick={OnLogout}>
                Logout
            </button>
        </div>
    );
}

export default Logout;