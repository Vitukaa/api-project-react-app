import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Container from './components/Container'
import PageWrapper from './components/PageWrapper'
import './styles/PostsPage.scss'

export default function PostsPage() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/posts?_expand=user`)
        .then(res => setPosts(res.data))
    }, [])



    return (
        <PageWrapper>
            <Container>
                <h1>Posts page</h1>
                <div className='posts-wrapper'>
                    <Link className='link' to='/posts/new'>Create new post</Link>
                    {posts && (
                        <>
                            {posts.map((post, index) => (
                                <div className='post-wrapper' key={index}>
                                    <Link to={'/posts/' + post.id}>
                                        <h2 className='post-title'>{post.title}</h2>
                                        <h3 className='post-author'>Author: {post.user.name}</h3>
                                        <p className='post-body'>{post.body.slice(0, 150) + '......'}</p>
                                    </Link>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </Container>
        </PageWrapper>
    )
}
