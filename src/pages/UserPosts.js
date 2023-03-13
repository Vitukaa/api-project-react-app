import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

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
        <div>
            {user.posts &&  (
                <>
                    <h1>All {user.name} posts:</h1>
                    <ul>
                        {user.posts.map((post, index) => (

                            <li key={index}>
                                <Link to={'/posts/'+ post.id}>{post.title}</Link>
                            </li>
                    
                        ))}
                    </ul>
                </>
            )}
        </div>
  )
}
