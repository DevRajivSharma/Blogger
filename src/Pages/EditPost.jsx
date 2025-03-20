import React,{useState,useEffect} from 'react';
import {PostForm,Container} from "../components";
import appwriteService from "../appwrite/database.js"
import {useNavigate,useParams} from "react-router-dom";

function EditPost() {
    const [Post, setPost] = useState()
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
    return Post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={Post} />
            </Container>
        </div>
    ) : null

}

export default EditPost;