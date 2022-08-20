import React from "react";
import { usePosts } from "../hooks/usePosts";



const PostsList = () => {
    const {data, loading, error} = usePosts()
    console.log({data, loading, error});

    if (loading) return <p>loading...</p>
    if (error) return <p>something went wrong</p>

    return (
        <div>
          {data.allPosts.map((post) => {
            return (
                <div>
                    <h3>{post.createdAt}</h3>
                </div>
            )
          })}  
        </div>
    )
}

export default PostsList;