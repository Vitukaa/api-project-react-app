import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from './components/Button'

export default function PostPage() {
    const { postId } = useParams()
    const navigate = useNavigate()

    const [post, setPost] = useState('')
    const [postDeleted, setPostDeleted] = useState(false)
    const [addComment, setAddComment] = useState(false)
    const [commentDeleted, setCommentDeleted] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        body: '',
        email: '',
        postId: Number(postId),
    })


    useEffect(() => {
        fetch(`http://localhost:3000/posts/${postId}?_expand=user&_embed=comments`)
        .then(res => res.json())
        .then(postData => {
            setPost(postData)
        })
    }, [])


    const deletePostHandler = () => {
        fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'DELETE',
        })

        setPostDeleted(true)
    }


    const redirectToEditPostPageHandler = () => {
        navigate(`./edit`)
    }


    const deleteCommentHandler = (id) => {
        fetch(`http://localhost:3000/comments/${id}`, {
            method: 'DELETE',
        })

        setCommentDeleted(true)
    }


    useEffect(() => {
        fetch(`http://localhost:3000/posts/${postId}?_expand=user&_embed=comments`)
        .then(res => res.json())
        .then(postData => {
            setPost(postData)
        })

        setCommentDeleted(false)
    }, [commentDeleted])


    const openCommentFormHandler = () => {
        setAddComment(true)
    }


    const formInputHandler = (event) => {
        setFormData(prevState => {
            const newData = {...prevState}
            newData[event.target.name] = event.target.value
            return newData
        })
    }


    const submitCommentHandler = () => {
        fetch(`http://localhost:3000/comments/`, {
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
    }


    return (
        <div>
            {post && !postDeleted && (
                <>
                    <div>
                        <Button buttonClass='delete-button' handler={deletePostHandler} buttonText='Delete post'></Button>
                        <Button buttonClass='edit-button' handler={redirectToEditPostPageHandler} buttonText='Edit post'></Button>
                        <div className='main-post'>
                            <h1>{post.title}</h1>
                            <p>{post.body}</p>
                            <h3>Author: {post.user.name}</h3>

                            <Link to={`/users/${post.userId}/posts`}>Visit all {post.user.name} posts</Link>
                        </div>
                        <div className='post-comments'>
                            <Button buttonClass='add-comment' handler={openCommentFormHandler} buttonText='Add comment' />
                            {post.comments  ? (
                                <>
                                    {post.comments.map((comment, index) => (
                                        <div className='comment' key={index}>
                                            <h4>{comment.name}</h4>
                                            <p>{comment.body}</p>
                                            <h5>Author: <a href={'mailto:'+comment.email}>{comment.email}</a></h5>
                                            <Button buttonClass='delete' handler={() => deleteCommentHandler(comment.id)} buttonText='Delete comment' />
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <h4>No comments yet. Be the first one to comment.</h4>
                            )}
                        </div>
                    </div>
                    {addComment && (
                        <form onSubmit={submitCommentHandler}>
                            <div className='form-control'>
                                <label htmlFor='name'>Title:</label>
                                <input type='text' name='name' value={formData.name} onChange={formInputHandler}></input>
                            </div>
                            <div className='form-control'>
                                <label htmlFor='body'>Comment body:</label>
                                <input type='text' name='body' value={formData.body} onChange={formInputHandler}></input>
                            </div>
                            <div className='form-control'>
                                <label htmlFor='email'>Author email:</label>
                                <input type='email' name='email' value={formData.email} onChange={formInputHandler}></input>
                            </div>
                            <input type='submit' value='Submit comment'></input>
                        </form>
                    )}
                </>
            )}
            {postDeleted && (
                <>
                    <h1>Post was deleted successfully!</h1>
                    <Link to={'/posts'}>Go to all posts</Link>
                </>
            )}
            
        </div>
    )
}
