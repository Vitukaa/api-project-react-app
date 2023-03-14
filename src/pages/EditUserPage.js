import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Container from './components/Container'
import PageWrapper from './components/PageWrapper'

export default function EditUserPage() {
    const { userId } = useParams()
    
    const [user, setUser] = useState('')
    const [formData, setFormData] = useState({})
    const [userEdited, setUserEdited] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])


    useEffect(() => {
        axios.get(`http://localhost:3000/users/${userId}`)
            .then(res => {
                setUser(res.data)
                setFormData(res.data)
            })
    }, [])


    const validateForm = () => {
        let messages = []

        if (!formData.name) {
            messages.push('Name is required')
        }
        if (!formData.username) {
            messages.push('Username is required')
        }
        if (!formData.description) {
            messages.push('Description is required')
        }
        if (!formData.email) {
            messages.push('Email is required')
        }
        if (!formData.address.suite || !formData.address.street || !formData.address.city) {
            messages.push('Address is required')
        }


        if (messages.length === 0) {
            return true
        } else {
            setErrorMessages(messages.reduce((str, current) => str + '; ' + current))
            return false
        }
    }

    const formInputHandler = (event, property) => {
        setFormData(prevState => {
            const newData = {...prevState}

            if (!property) {
                newData[event.target.name] = event.target.value
            } else {
                newData[property][event.target.name] = event.target.value
            }
            
            return newData
        })
    }


    const editedUserHandler = (event) => {
        event.preventDefault()

        if (!validateForm()) {
        return
        }

        fetch(`http://localhost:3000/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(
                {...formData}
            ),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));

        setUserEdited(true)
    }


  return (
    <PageWrapper>
        <Container>
            {(user && !userEdited) && (
                <form className='form' onSubmit={editedUserHandler}>
                    <div className='form-control'>
                        <label htmlFor='name'>*Full name:</label>
                        <input type='text' name='name' value={formData.name} onChange={formInputHandler}></input>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='username'>*Username:</label>
                        <input type='text' name='username' value={formData.username} onChange={formInputHandler}></input>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='description'>*Description:</label>
                        <textarea name='description' rows="8" cols="50" value={formData.description} onChange={formInputHandler}></textarea>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='email'>*Email:</label>
                        <input type='email' name='email' value={formData.email} onChange={formInputHandler}></input>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='phone'>Phone:</label>
                        <input type='tel' name='phone' value={formData.phone} onChange={formInputHandler}></input>
                    </div>
                    <div className='form-control'>
                        <div>*Address:</div>
                        <label htmlFor='suite'>Suite:</label>
                        <input type='text' name='suite' value={formData.address.suite} onChange={(event) => formInputHandler( event, 'address')}></input>
                        <label htmlFor='street'>Street:</label>
                        <input type='text' name='street' value={formData.address.street} onChange={(event) => formInputHandler( event, 'address')}></input>
                        <label htmlFor='city'>City:</label>
                        <input type='text' name='city' value={formData.address.city} onChange={(event) => formInputHandler( event, 'address')}></input>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='website'>Website:</label>
                        <input type='text' name='website' value={formData.website} onChange={formInputHandler}></input>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='name'>Company:</label>
                        <input type='text' name='name' value={formData.company.name} onChange={(event) => formInputHandler( event, 'company')}></input>
                    </div>
                        
                    <input className='button' type='submit' value='Edit user'></input>
                </form>
            )}

        {userEdited ? (
            <>
            <h2>User ({formData.name}) was edited!</h2>
            <Link className='link' to={'/users'}>Go to all users</Link>
            </>
        ) : (
            <p>{errorMessages}</p>
        )}
      </Container>
    </PageWrapper>
  )
}
