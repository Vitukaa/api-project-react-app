import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function PostsPage() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/posts?_expand=user`)
        .then(res => res.json())
        .then(postsData => {
            setPosts(postsData)
        })
    }, [])



    return (
        <div>
            <Link to='/posts/new'>Create new post</Link>
            {posts && (
                <>
                    {posts.map((post, index) => (
                        <div className='post-wrapper' key={index}>
                            <Link to={'/posts/' + post.id}>
                                <h2 >{post.title}</h2>
                                <h3>Author: {post.user.name}</h3>
                                <p>{post.body.slice(0, 150) + '......'}</p>
                            </Link>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}
