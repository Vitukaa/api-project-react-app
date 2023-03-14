import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Container from './components/Container'
import PageWrapper from './components/PageWrapper'
import './styles/UserPosts.scss'

export default function UserPosts() {
    const { userId } = useParams()

    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {
        fetch(`http://localhost:3000/users/${userId}?_embed=posts`)
        .then(res => res.json())
        .then(userData => {
            setUser(userData)
        })
    }, [])

    console.log(user.posts)
  return (
        <PageWrapper>
            {user.posts &&  (
                <Container>
                    <h1>All {user.name} posts:</h1>
                        <ul className='posts-wrapper'>
                            {user.posts.map((post, index) => (

                                <li className='post-wrapper' key={index}>
                                    <Link to={'/posts/'+ post.id}>{post.title}</Link>
                                </li>
                        
                            ))}
                        </ul>
                </Container>
            )}
        </PageWrapper>
  )
}
