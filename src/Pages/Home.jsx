import React,{useState,useEffect} from 'react';
import {PostCard,Container} from "../Components";
import appwriteService from "../appwrite/database.js"

function Home() {
    const [Posts, setPosts] = useState([])

    useEffect(() => {
            appwriteService.listPost()
                .then(Posts => {
                    if (Posts){
                        setPosts(Posts.documents);
                    }
                })
    },[])
    if (Posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read Posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
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
    )
}

export default Home;