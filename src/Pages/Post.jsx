import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/database.js";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    console.log('post : ',post)
    console.log('usrData:',userData);
    const isAuthor = post && userData ? post.user_id === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.p_images);
                navigate("/");
            }
        });
    };
    return post ? (
        <div className="py-8 ">
            <Container className="border p-4 rounded-xl ">
                <div className="w-full flex justify-between mb-4 relative border-gray-100 rounded-xl p-2 ">
                    <img
                        src={appwriteService.getFilePreview(post.p_images)}
                        alt={post.title}
                        className="rounded-xl "
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3 rounded
                                 text-black text-lg px-2">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor={'hover:bg-gray-300 bg-gray-200 text-lg text-[#eb0505] rounded px-2'} onClick={deletePost}>
                                Delete&ensp;
                                <i className="fa-solid fa-trash text-[#eb0505]" ></i>
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.p_title}</h1>
                </div>
                <div className="browser-css">

                    {parse(post.p_post)}
                </div>
            </Container>
        </div>
    ) : null;
}