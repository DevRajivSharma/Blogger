import React, {useState} from 'react';
import {Container,PostCard} from "../Components";
import appwriteService from "../appwrite/database.js"
import Loader from "../Components/Loader.jsx";
import {Query} from "appwrite";
import {useSelector} from "react-redux";
function AllPost() {
    const [Posts, setPosts] = useState([])
    const user_id = useSelector(state => state.auth.userData.$id)
    appwriteService.listPost([Query.equal("user_id", user_id)])
        .then(posts => {
            if (posts){
                setPosts(posts.documents);
            }
        })
    if (Posts.length === 0) {
        return (
            <div className={'h-165 flex items-center'}><Loader/></div>
        )
    }
    return (
        <div className='min-h-165 w-full py-8'>
            <Container>
                <div  className='flex  flex-wrap md:flex-row sm:flex-col justify-center'>
                    {Posts.map((post) => (
                        <div key={post.$id} className='p-2 md:w-1/2 lg:w-1/4 w-full' >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPost;