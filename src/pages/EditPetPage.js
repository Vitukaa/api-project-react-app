import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from './components/Button'
import Container from './components/Container'
import PageWrapper from './components/PageWrapper'

export default function EditPetPage() {
    const speciesArr = ['cat', 'dog', 'rabbit', 'parrot', 'other']

    const { petId } = useParams()

    const [pet, setPet] = useState('')
    const [users, setUsers] = useState([])
    const [formData, setFormData] = useState({})
    const [petEdited, setPetEdited] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])

    
    useEffect(() => {
        axios.get(`http://localhost:3000/users/`)
        .then(res => setUsers(res.data));
    }, [])
    
    useEffect(() => {
        axios.get(`http://localhost:3000/pets/${petId}`)
            .then(res => {
                setPet(res.data)
                setFormData(res.data)
            })
    }, [])



    const formInputHandler = (event) => {
        setFormData(prevState => {
            const newData = {...prevState}
            if (event.target.name === 'userId') {
                newData[event.target.name] = Number(event.target.value)
            } else {
                newData[event.target.name] = event.target.value
            }
            return newData
        })
    }


    const editedPetHandler = (event) => {
        event.preventDefault()

        fetch(`http://localhost:3000/pets/${petId}`, {
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

            setPetEdited(true)
    }


  return (
    <PageWrapper>
        <Container>
            {pet && !petEdited && (
                <form className='form' onSubmit={editedPetHandler}>
                    <div className='form-control'>
                        <label htmlFor='name'>Name:</label>
                        <input type='text' name='name' value={formData.name} onChange={formInputHandler}></input>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='species'>Species:</label>
                        <select name='species' onChange={formInputHandler} defaultValue={pet.species}>
                            {speciesArr.map((species, index) => <option key={index} value={species}>{species[0].toUpperCase() + species.slice(1)}</option>)}
                        </select>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='age'>Age:</label>
                        <input type='number' name='age' min='0' max='25' value={formData.age} onChange={formInputHandler}></input>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='image'>Image url:</label>
                        <input type='text' name='image' value={formData.image} onChange={formInputHandler}></input>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='userId'>Owner name:</label>
                        <select name='userId' onChange={formInputHandler} defaultValue={pet.userId}>
                            {users.map((owner, index) => <option key={index} value={owner.id}>{owner.name}</option>)}
                        </select>
                    </div>
                    <input className='button' type='submit' value='Edit pet'></input>
                </form>
            )}
            {petEdited ? (
                <>
                    <h1>New pet ({formData.name}) was edited!</h1>
                    <Link className='link' to={'/pets'}>Go to all pets</Link>
                </>
            ) : (
                <p>{errorMessages}</p>
            )}
        </Container>
    </PageWrapper>
  )
}
