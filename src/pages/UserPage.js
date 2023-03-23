import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from './components/Button'
import Container from './components/Container'
import PageWrapper from './components/PageWrapper'
import './styles/UserPage.scss'

export default function UserPage() {
    const { userId } = useParams()
    const navigate = useNavigate()

    const [user, setUser] = useState('')
    const [isDeleted, setIsDeleted] = useState(false)
    

    useEffect(() => {
        axios.get(`http://localhost:3000/users/${userId}`)
            .then(res => setUser(res.data))
            .catch(error => console.log(error))
    }, [])


    const deleteUserHandler = () => {
        axios.delete(`http://localhost:3000/users/${userId}`)
        .catch(error => console.log(error))

        setIsDeleted(true)
    }


    const redirectToEditUserPage = () => {
        navigate(`./edit`)
    }


  return (
    <PageWrapper>
        {user &&
        <Container>
            {!isDeleted ? (
                <>
                    <Button buttonClass='delete-button' handler={deleteUserHandler} buttonText='Delete user'/>
                    <Button buttonClass='edit-button' handler={redirectToEditUserPage} buttonText='Edit user'/>
                    <h1 className='title'>{user.name} ({user.username})</h1>
                    <h3 className='subtitle'>About me:</h3>
                    <p>{user.description}</p>
                    <h3 className='subtitle'>Contacts:</h3>
                    <ul className='info-list'>
                        <li>{user.email}</li>
                        {user.address && (
                            <li>Address: <a target='blank' href={`http://maps.google.com/?q=${user.address.street},${user.address.suite},${user.address.city}`}>{user.address.street}, {user.address.suite}, {user.address.city}</a></li>
                        )}
                        {user.phone && (
                            <li>{user.phone}</li>

                        )}
                    </ul>
                    {user.company && user.company.name.length > 0 &&
                        <h4 className='additional-info-title'>Working at: {user.company.name}</h4>
                    }
                    {user.website && (
                        <>
                            <h5 className='additional-info-title'>Additional information:</h5>
                            <ul className='info-list'>
                                <li>Website:
                                    <a href={user.website} target='blank'>{user.website}</a>
                                </li>
                                {user.interests && (
                                    <li>Interests: {user.interests}</li>
                                )}
                            </ul>
                        </>
                    )}
                </>
            ) : (
                <>
                    <h1>User ({user.name}) deleted successfully</h1>
                    <Link className='link' to={'/users'}>Go to all users</Link>
                </>
            )}
        </Container>
        }
    </PageWrapper>
  )
}
