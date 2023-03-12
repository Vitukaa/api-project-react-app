import { click } from '@testing-library/user-event/dist/click'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function UserPage() {
    const { userId } = useParams()
    const navigate = useNavigate()

    const [user, setUser] = useState('')
    const [isDeleted, setIsDeleted] = useState(false)
    

    useEffect(() => {
        fetch(`http://localhost:3000/users/${userId}`)
            .then(res => res.json())
            .then(userData => {
                setUser(userData)
            })
    }, [])


    const deleteUserHandler = () => {
        fetch(`http://localhost:3000/users/${userId}`, {
            method: 'DELETE',
        });

        setIsDeleted(true)
    }


    const redirectToEditUserPage = () => {
        navigate(`./edit`)
    }


  return (
    <div>
        {user &&
        <div>
            {!isDeleted ? (
                <>
                    <button className='delete-button' onClick={deleteUserHandler}>Delete user</button>
                    <button className='edit-button' onClick={redirectToEditUserPage}>Edit user</button>
                    <h1>{user.name} ({user.username})</h1>
                    <h3>About me:</h3>
                    <p>{user.description}</p>
                    <h3>Contacts:</h3>
                    <ul>
                        <li>{user.email}</li>
                        {user.address && (
                            <li>Address: <a target='blank' href={`http://maps.google.com/?q=${user.address.street},${user.address.suite},${user.address.city}`}>{user.address.street}, {user.address.suite}, {user.address.city}</a></li>
                            )}
                        <li>{user.phone}</li>
                    </ul>
                    {user.company &&
                        <h4>Working at: {user.company.name}</h4>
                    }
                    <h5>Additional information:</h5>
                    <ul>
                        <li>Website: <a href={user.website} target='blank'>{user.website}</a></li>
                        {user.interests && (
                            <li>Interests: {user.interests}</li>
                            )}
                    </ul>
                </>
            ) : (
                <>
                    <p>User ({user.name}) deleted successfully</p>
                    <Link to={'/users'}>Go to all users</Link>
                </>
            )}
        </div>
        }
    </div>
  )
}
