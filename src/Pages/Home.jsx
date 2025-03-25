import React,{useState,useEffect} from 'react';
import {PostCard,Container} from "../Components";
import appwriteService from "../appwrite/database.js"
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Loader from "../Components/Loader.jsx";
import {verifyStatus} from "../feature/authSlice.js"


function Home() {
    const [Posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.listPost([])
            .then(Posts => {
                if (Posts){
                    setPosts(Posts.documents);
                }
            })
    },[])
    if (Posts.length === 0) {
        return (
            <div className={'h-165 flex items-center'}><Loader/></div>
        )
    }
    return (
        <div className='w-full  py-8'>

            <Container>

                <div className='flex  flex-wrap md:flex-row sm:flex-col justify-center'>
                    {Posts.map((post) => (
                        <div key={post.$id} className='p-2 md:w-1/2 lg:w-1/4 w-full '>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home;