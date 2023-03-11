import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

export default function UserPage() {
    const { userId } = useParams()

    const [user, setUser] = useState('')

    useEffect(() => {
        fetch(`http://localhost:3000/users/${userId}`)
            .then(res => res.json())
            .then(userData => {
                console.log(userData)
                setUser(userData)
            })
    }, [])

    const userAddressLink = `http://maps.google.com/?q=${user.address.street},${user.address.suite},${user.address.city}`

  return (
    <div>
        <h1>{user.name}</h1>
        <h2>{user.username}</h2>
        <h3>Contacts:</h3>
        <ul>
            <li>{user.email}</li>
            <li>Address{user.address.street}, {user.address.suite}, {user.address.city}}</li>
            <li>{user.phone}</li>
        </ul>
    </div>
  )
}
