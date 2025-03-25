import React, {useState} from 'react';
import {Container,PostCard} from "../Components";
import appwriteService from "../appwrite/database.js"
import Loader from "../Components/Loader.jsx";
function AllPost() {
    const [Posts, setPosts] = useState([])

    appwriteService.listPost([])
        .then(posts => {
            if (posts){
                setPosts(posts.documents);
            }
        })
    if (Posts.length === 0) {
        return (
            <div className={'h-100 flex items-center'}><Loader/></div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {Posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPost;