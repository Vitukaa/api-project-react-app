import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './UsersPage.css'

export default function UsersPage() {
    const [users, setUsers] = useState([])
    const [userWasDeleted, setUserWasDeleted] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:3000/users/`)
            .then(res => res.json())
            .then(usersData => {
                console.log(usersData)
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
                    console.log(usersData)
                    setUsers(usersData)
                })

                setUserWasDeleted(false)
        }, [userWasDeleted])





    const partUpdateHandler = () => {
        fetch(`http://localhost:3000/users/12`, {
            method: 'PATCH',
            body: JSON.stringify({
                name: 'bbb',
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    }

    const wholeUpdateHandler = () => {
        fetch(`http://localhost:3000/users/12`, {
            method: 'PUT',
            body: JSON.stringify({
                id: 12,
                name: 'naujas vardas',
                username: 'slapyvardis',
                email: 'mail@mail.mail',
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    }


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
                        <button onClick={() => deleteUserHandler(user.id)}>Delete user</button>
                    </li>
                ))}
            </ul>
        ) : (
            <p>No users yet...</p>
        )}
    </div>
  )
}
