import React, { useState } from 'react'

export default function CreateUserPage() {
    const defaultFormData = {
        name: '',
        username: '',
        description: '',
        email: '',
        phone: '',
        address: {
            suite: '',
            street: '',
            city: '',
            },
        website: '',
        company: {
            name: '',
        },
    }

  const [formData, setFormData] = useState(defaultFormData)

  const [userCreated, setUserCreated] = useState(false)

  const [errorMessages, setErrorMessages] = useState([])

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
        if (!formData.address) {
            messages.push('Address is required')
        }

        if (messages.length === 0) {
            return true
        } else {
            setErrorMessages(messages.reduce((str, current) => str + '; ' + current))
            return false
        }
    }

    const formInputHandler = (event) => {
        setFormData(prevState => {
            const newData = {...prevState}
            newData[event.target.name] = event.target.value
            return newData
        })
    }   

    const newUserHandler = (event) => {
        event.preventDefault()

        if (!validateForm()) {
        return
        }

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

        setFormData(defaultFormData)
        setUserCreated(true)
    }


  return (
    <div>
          <form onSubmit={newUserHandler}>
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
            <label htmlFor='suite'></label>
            <input type='text' name='suite' value={formData.address.suite} onChange={formInputHandler}></input>
            <label htmlFor='street'></label>
            <input type='text' name='street' value={formData.address.street} onChange={formInputHandler}></input>
            <label htmlFor='city'></label>
            <input type='text' name='city' value={formData.address.city} onChange={formInputHandler}></input>
        </div>
        <div className='form-control'>
            <label htmlFor='website'>Website:</label>
            <input type='text' name='website' value={formData.website} onChange={formInputHandler}></input>
        </div>
        <div className='form-control'>
            <label htmlFor='company'>Company:</label>
            <input type='text' name='company' value={formData.company.name} onChange={formInputHandler}></input>
        </div>
            
        <input type='submit' value='Create new user'></input>
    </form>
    {userCreated ? (
        <h2>New user ({formData.name}) was created!</h2>
    ) : (
        <p>{errorMessages}</p>
    )}
    </div>
  )
}
