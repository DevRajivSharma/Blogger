import React from 'react';
import {Link} from "react-router-dom";
import db from "../appwrite/database.js"
import parse from "html-react-parser";
function PostCard({
    $id,
    p_title,
    p_post,
    p_images
    }) {
    const parsePost = p_post.split("")
        .map((post,index) => (index < 175 ? post :null))
    return (
        <Link to={`/post/${$id}`}>
            <div
                className="max-w-sm  border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700  h-100">
                <div className={'bg-black'}>
                    <img
                         src={db.getFilePreview(p_images)}
                         alt={p_title}
                         className="rounded-t-lg h-40 w-full object-cover m-auto"
                    />
                </div>
                <div className="p-5">

                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{p_title}</h5>

                    <p className="mb-3 font-normal text-gray-700 text-lg dark:text-gray-400">
                        {parse(parsePost.join(""))}
                        {p_post.length > 220? "........":null}
                    </p>

                </div>
            </div>

        </Link>
    );
}

export default PostCard;