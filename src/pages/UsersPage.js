import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function UsersPage() {
    const [users, setUsers] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
    })

    useEffect(() => {
        fetch(`http://localhost:3000/users/`)
            .then(res => res.json())
            .then(usersData => {
                console.log(usersData)
                setUsers(usersData)
            })
    }, [])


    const formInputHandler = (event) => {
        setFormData(prevState => {
            const newData = {...prevState}
            newData[event.target.name] = event.target.value
            return newData
        })
    }



    const newUserHandler = () => {
        fetch(`http://localhost:3000/users/`, {
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
        <form onSubmit={newUserHandler}>
            <div className='form-control'>
                <label htmlFor='name'>Full name:</label>
                <input type='text' name='name' value={formData.name} onChange={formInputHandler}></input>
            </div>
            <div className='form-control'>
                <label htmlFor='username'>Username:</label>
                <input type='text' name='username' value={formData.username} onChange={formInputHandler}></input>
            </div>
            <div className='form-control'>
                <label htmlFor='email'>Email:</label>
                <input type='email' name='email' value={formData.email} onChange={formInputHandler}></input>
            </div>
            
            <input type='submit' value='Create new user'></input>
        </form>
        <button onClick={deleteUserHandler}>Delete user</button>
        <button onClick={partUpdateHandler}>Edit user (part)</button>
        <button onClick={wholeUpdateHandler}>Whole user update</button>
        <ul>
            {users.map((user, index) => (
                <li key={index}>
                    <Link to={'/users/' + user.id}>
                        {user.name}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
  )
}
