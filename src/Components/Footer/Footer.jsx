import React from 'react';
import {Link} from "react-router-dom";
function Footer() {
    const footerMentions =[
        {
            name:'Github',
            link:"https://github.com/DevRajivSharma"
        },        {
            name:'Linkedin',
            link:"www.linkedin.com/in/devrajiv"
        },        {
            name:'Discord',
            link:"https://discord.gg/b3RY9GAu"
        },        {
            name:'Instagram',
            link:"https://www.instagram.com/_rrajiv_sharma_/"
        },
    ]
    return (
        <div className={''}>
            <hr className={'text-gray-500 mb-1'}/>
            <div className={'flex justify-evenly h-10  items-center'}>
                {footerMentions.map(item => (
                    <Link key={item.name} to={item.link}
                          className={'text-white font-semibold '}>
                        {item.name}
                    </Link>
                ))}
            </div>
            <p  className={'text-[#737373] mb-1 font-semibold text-center text-sm'}>no  copyright &copy; 2025</p>
        </div>
    );
}

export default Footer;