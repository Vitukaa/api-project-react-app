import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function EditPostPage() {
    const { postId } = useParams()

    const [users, setUsers] = useState([])
    const [post, setPost] = useState({})
    const [formData, setFormData] = useState({})
    const [postEdited, setPostEdited] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])


    useEffect(() => {
        fetch(`http://localhost:3000/users/`)
        .then(res => res.json())
        .then(usersData => {
            setUsers(usersData)
        });
    }, [])


    useEffect(() => {
        fetch(`http://localhost:3000/posts/${postId}`)
            .then(res => res.json())
            .then(postData => {
                console.log(postData)
                setPost(postData)
                setFormData(postData)
            })
    }, [])


    const formInputHandler = (event) => {
        setFormData(prevState => {
            const newData = {...prevState}
            newData[event.target.name] = event.target.value
            return newData
        })
    }


    const validateForm = () => {
        let messages = []
        
        if (!formData.title) {
            messages.push('Title is required')
        }
        if(!formData.body) {
            messages.push('Body is required')
        }
        if(!formData.userId) {
            messages.push('Author is required')
        }
        
        if (messages.length === 0) {
            return true
        } else {
            setErrorMessages(messages.reduce((str, current) => str + '; ' + current))
            return false
        }
    }


    const editedPostHandler = (event) => {
        event.preventDefault()

        fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify(
                {...formData}
            ),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));

        setPostEdited(true)
    }



  return (
    <div>
            {post && !postEdited && (
                <form onSubmit={editedPostHandler}>
                    <div className='form-control'>
                        <label htmlFor='title'>*Title:</label>
                        <input type='text' name='title' value={formData.title} onChange={formInputHandler}></input>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='body'>*Body:</label>
                        <textarea name='body' rows='20' cols='100' value={formData.body} onChange={formInputHandler}></textarea>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='userId'>*Author:</label>
                        <select name='userId' defaultValue={post.userId} onChange={formInputHandler}>
                            {users.map((user, index) => (
                                <option key={index} value={user.id}>{user.name}</option>
                            ))}
                        </select>
                    </div>
                    <input type='submit' value='Edit post'></input>
                </form>
            )}
            {postEdited ? (
                <>
                <h1>Post was edited!</h1>
                <Link to={'/posts'}>Go to all posts</Link>
                </>
            ) : (
                <p>{errorMessages}</p>
            )}
    </div>
  )
}
