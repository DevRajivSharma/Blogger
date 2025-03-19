import React from 'react';
import {Logout,NavBar} from "..";
import BloggerLogo from "../../assets/BloggerLogo.jsx"
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
function Header() {
    const authStatus = useSelector((state)=>state.AuthReducer.status)

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]
    return (
        <div className={'flex '}>
            <NavBar navItems={navItems} />
            {authStatus}&&<Logout className=""/>
        </div>
    );
}

export default Header;