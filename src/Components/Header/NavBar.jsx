import React from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import Container from "../Container/Container.jsx";
import Button from "../Button.jsx";
function NavBar(
    {
        navItems
    }
) {
    const navigate = useNavigate();
    return (
        <Container>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
               <ul className="navbar-nav">
                   {navItems.map(item =>(
                   item.active &&
                    <Button
                        key={item.name}
                        onClick={() => {
                            navigate(item.slug);
                        }}>
                           {item.name}
                    </Button>
                   ))}
               </ul>
            </nav>
        </Container>
    );
}

export default NavBar;