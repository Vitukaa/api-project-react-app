import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from './components/Button'

export default function EditPetPage() {
    const speciesArr = ['cat', 'dog', 'rabbit', 'parrot', 'other']

    const { petId } = useParams()

    const [pet, setPet] = useState('')
    const [users, setUsers] = useState([])
    const [formData, setFormData] = useState({})
    const [petEdited, setPetEdited] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])

    
    useEffect(() => {
        fetch(`http://localhost:3000/users/`)
        .then(res => res.json())
        .then(usersData => {
            setUsers(usersData)
        });
    }, [])
    
    useEffect(() => {
        fetch(`http://localhost:3000/pets/${petId}`)
            .then(res => res.json())
            .then(petData => {
                console.log(petData)
                setPet(petData)
                setFormData(petData)
            })
    }, [])



    const formInputHandler = (event) => {
        setFormData(prevState => {
            const newData = {...prevState}
            console.log(newData)
            console.log(newData.species)

            newData[event.target.name] = event.target.value
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
    <div>
        <div>
            {pet && !petEdited && (
                <form onSubmit={editedPetHandler}>
                    <div className='form-control'>
                        <label htmlFor='name'>Name:</label>
                        <input type='text' name='name' value={formData.name} onChange={formInputHandler}></input>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='species'>Species:</label>
                        <select name='species' onChange={formInputHandler} defaultValue={pet.species}>
                            {speciesArr.map((species, index) => <option key={index} value={species}>{species}</option>)}
                        </select>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='age'>Age:</label>
                        <input type='number' name='age' value={formData.age} onChange={formInputHandler}></input>
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
                    <input type='submit' value='Edit pet'></input>
                </form>
            )}
            {petEdited ? (
                <>
                    <h2>New pet ({formData.name}) was edited!</h2>
                    <Link to={'/pets'}>Go to all pets</Link>
                </>
            ) : (
                <p>{errorMessages}</p>
            )}
        </div>
    </div>
  )
}
