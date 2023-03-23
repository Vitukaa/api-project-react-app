import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Container from './components/Container'
import PageWrapper from './components/PageWrapper'
import './styles/UserPosts.scss'

export default function UserPosts() {
    const { userId } = useParams()

    const [user, setUser] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:3000/users/${userId}?_embed=posts`)
        .then(res => setUser(res.data))
        .catch(error => console.log(error))
    }, [])

    
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
