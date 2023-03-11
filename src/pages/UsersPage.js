import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './UsersPage.css'

export default function UsersPage() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/users/`)
            .then(res => res.json())
            .then(usersData => {
                console.log(usersData)
                setUsers(usersData)
            })
    }, [])


    const deleteUserHandler = () => {
        fetch(`http://localhost:3000/users/13`, {
            method: 'DELETE',
        });
    }

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
        <ul>
            {users.map((user, index) => (
                <li key={index}>
                    <Link to={'/users/' + user.id}>
                        {user.name}
                    </Link>
                    <button onClick={deleteUserHandler}>Delete user</button>
                </li>
            ))}
        </ul>
    </div>
  )
}
