import React from 'react';
import {Logout,NavBar} from "..";
import BloggerLogo from "../BloggerLogo.jsx"
import {useSelector} from "react-redux";
import Button from "../Button.jsx";
import Container from "../Container/Container.jsx";
import {useNavigate} from "react-router-dom";
function Header() {
    const authStatus = useSelector((state)=>state.auth.status)
    const navigate = useNavigate();
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
            name: "My Posts",
            slug: "/my-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]
    return (
        <div className={'sticky top-0 w-full z-1'}>
        <div className={'flex p-2 justify-between  bg-[#404248]'}>
            <NavBar navItems={navItems} />
            {authStatus && <Logout className=""/>}
        </div>
        </div>
    );
}

export default Header;