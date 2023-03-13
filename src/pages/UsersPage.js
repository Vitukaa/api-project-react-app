import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from './components/Button'
import './UsersPage.css'

export default function UsersPage() {
    const [users, setUsers] = useState([])
    const [userWasDeleted, setUserWasDeleted] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:3000/users/`)
            .then(res => res.json())
            .then(usersData => {
                setUsers(usersData)
            })
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
    <div>
        <h1>Users page</h1>
        <Link to='/users/new'>Create new user</Link>
        
        {/* <button onClick={partUpdateHandler}>Edit user (part)</button>
        <button onClick={wholeUpdateHandler}>Whole user update</button>
         */}
         {users && users.length > 0 ? (
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        <Link to={'/users/' + user.id}>
                            {user.name}
                        </Link>
                        <Button buttonClass='delete-button' handler={() => deleteUserHandler(user.id)} buttonText='Delete user'/>
                    </li>
                ))}
            </ul>
        ) : (
            <p>No users yet...</p>
        )}
    </div>
  )
}
