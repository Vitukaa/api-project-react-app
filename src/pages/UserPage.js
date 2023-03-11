import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

export default function UserPage() {
    const { userId } = useParams()

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState('')
    
    useEffect(() => {
        fetch(`http://localhost:3000/users/${userId}`)
            .then(res => res.json())
            .then(userData => {
                console.log(userData)
                setUser(userData)
            })
    }, [])
    
    console.log(user)

    if (user.address) {
        const userAddressLink = `http://maps.google.com/?q=${user.address.street},${user.address.suite},${user.address.city}`
    }

  return (
    <div>
        {user &&
        <>
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
        }
            
    </div>
  )
}
