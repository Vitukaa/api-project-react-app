import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Container from './components/Container'
import PageWrapper from './components/PageWrapper'
import './styles/Form.scss'

export default function CreatePostPage() {

    const [users, setUsers] = useState([])
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        userId: 1,
    })
    const [postCreated, setPostCreated] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])


    useEffect(() => {
        fetch(`http://localhost:3000/users/`)
        .then(res => res.json())
        .then(usersData => {
            setUsers(usersData)
        });
    }, [])
    
    
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
    

    const formInputHandler = (event) => {
        setFormData(prevState => {
            const newData = {...prevState}
            newData[event.target.name] = event.target.value
            return newData
        })
    }
    
    const newPostHandler = (event) => {
        event.preventDefault()

        if (!validateForm()) {
            return
        }

        fetch(`http://localhost:3000/posts/`, {
        method: 'POST',
        body: JSON.stringify(
            {...formData}
        ),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((json) => console.log(json));

        setPostCreated(true)
    }


    return (
        <PageWrapper>
            <Container>
                {!postCreated && (
                    <form className='form' onSubmit={newPostHandler}>
                        <div className='form-control'>
                            <label htmlFor='title'>*Title:</label>
                            <input type='text' name='title' value={formData.title} onChange={formInputHandler}></input>
                        </div>
                        <div className='form-control'>
                            <label htmlFor='body'>*Body:</label>
                            <textarea name='body' rows='15' cols='80' value={formData.body} onChange={formInputHandler}></textarea>
                        </div>
                        <div className='form-control'>
                            <label htmlFor='userId'>*Author:</label>
                            <select name='userId' value={formData.userId} onChange={formInputHandler}>
                                {users.map((user, index) => (
                                    <option key={index} value={user.id}>{user.name}</option>
                                    ))}
                            </select>
                        </div>
                        <input className='button' type='submit' value='Create new post'></input>
                    </form>
                )}
                {postCreated ? (
                    <>
                    <h1>New post was created!</h1>
                    <Link className='link' to={'/posts'}>Go to all posts</Link>
                    </>
                ) : (
                    <p>{errorMessages}</p>
                    )}
            </Container>
        </PageWrapper>
    )
}
