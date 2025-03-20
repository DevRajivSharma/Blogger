import React from 'react';
import {Logout,NavBar} from "..";
import BloggerLogo from "../../assets/BloggerLogo.jsx"
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
            {/*{navItems}*/}
            {/*<Container>*/}
            {/*    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">*/}
            {/*        <ul className="navbar-nav">*/}
            {/*            {navItems.map((item) =>*/}
            {/*                item.active ? (*/}
            {/*                    <li key={item.name}>*/}
            {/*                        <button*/}
            {/*                            onClick={() => navigate(item.slug)}*/}
            {/*                            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'*/}
            {/*                        >{item.name}</button>*/}
            {/*                    </li>*/}
            {/*                ) : null*/}
            {/*            )}*/}

            {/*        </ul>*/}
            {/*    </nav>*/}
            {/*</Container>*/}
            {authStatus && <Logout className=""/>}
        </div>
    );
}

export default Header;