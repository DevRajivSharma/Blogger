import React from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import Container from "../Container/Container.jsx";
import Button from "../Button.jsx";

function NavBar({ navItems = [] }) {
    const navigate = useNavigate();

    return (
        <Container>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <ul className="navbar-nav flex ">
                    {navItems.map((item) =>
                        item.active ? (
                            <li key={item.name}>
                                <button
                                    onClick={() => navigate(item.slug)}
                                    className='inline-bock px-4 py-2 hover:underline underline-offset-2 hover:text-blue-800
                                     rounded-full'
                                >{item.name}</button>
                            </li>
                        ) : null
                    )}

                </ul>
            </nav>
        </Container>
    );
}


export default NavBar;