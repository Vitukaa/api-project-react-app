import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './components/Button'
import Container from './components/Container'
import PageWrapper from './components/PageWrapper'
import './styles/UsersPage.scss'

export default function UsersPage() {
    const [users, setUsers] = useState([])
    const [userWasDeleted, setUserWasDeleted] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:3000/users/`)
            .then(res => setUsers(res.data))
    }, [])

    const deleteUserHandler = (userId) => {
        fetch(`http://localhost:3000/users/${userId}`, {
            method: 'DELETE',
        });
        
        setUserWasDeleted(true)
    }


    useEffect(() => {
        fetch(`http://localhost:3000/users/`)
            .then(res => res.json())
            .then(usersData => {
                setUsers(usersData)
            })

            setUserWasDeleted(false)
    }, [userWasDeleted])



  return (
    <PageWrapper>
        <Container>
            <h1>Users page</h1>
            <Link className='link' to='/users/new'>Create new user</Link>
            {users && users.length > 0 ? (
                <ul className='users-list'>
                    {users.map((user, index) => (
                        <li className='user-item' key={index}>
                            <Link to={'/users/' + user.id}>
                                {user.name}
                            </Link>
                            <Button buttonClass='delete' handler={() => deleteUserHandler(user.id)} buttonText='Delete user'/>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No users yet...</p>
            )}
        </Container>
    </PageWrapper>
  )
}
