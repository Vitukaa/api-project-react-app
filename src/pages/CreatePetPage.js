import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './components/Button'
import Container from './components/Container'
import PageWrapper from './components/PageWrapper'
import './styles/Form.scss'

export default function CreatePetPage() {
    const speciesArr = ['cat', 'dog', 'rabbit', 'parrot', 'other']

    const defaultInputsValues = {
        name: '',
        species: 'cat',
        age: 0,
        image: '',
        userId: 1,
    }

    const [formData, setFormData] = useState(defaultInputsValues)
    const [users, setUsers] = useState([])
    const [errorMessages, setErrorMessages] = useState([])
    const [petCreated, setPetCreated] = useState(false)


    useEffect(() => {
        fetch(`http://localhost:3000/users/`)
            .then(res => res.json())
            .then(usersData => {
                setUsers(usersData)
            });
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


    const validateForm = () => {
        let messages = []

        if(!formData.name) {
            messages.push('Name is required')
        }
        if(!formData.species) {
            messages.push('Species is required')
        }
        if(!formData.age) {
            messages.push('Age is required')
        }
        if(!formData.image) {
            messages.push('Image url is required')
        }
        if(!formData.userId) {
            messages.push('Owner is required')
        }

        if (messages.length === 0) {
            return true
        } else {
            setErrorMessages(messages.reduce((str, current) => str + '; ' + current))
            return false
        }
    }


    const newPetHandler = (event) => {
        event.preventDefault()

        if (!validateForm()) {
            return
        }

        fetch(`http://localhost:3000/pets/`, {
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

        setPetCreated(true)
    }


    const createAnotherPet = () => {
        setFormData(defaultInputsValues)
        setPetCreated(false)
    }


    return (
        <PageWrapper>
        <Container>
            {!petCreated && (
                <form className='create-pet form' onSubmit={newPetHandler}>
                    <div className='form-control'>
                        <label htmlFor='name'>Name:</label>
                        <input type='text' name='name' value={formData.name} onChange={formInputHandler}></input>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='species'>Species:</label>
                        <select name='species' onChange={formInputHandler}>
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
                        <select name='userId' onChange={formInputHandler}>
                            {users.map((owner, index) => <option key={index} value={owner.id}>{owner.name}</option>)}
                        </select>
                    </div>
                    <input className='button' type='submit' value='Create new pet'></input>
                </form>
            )}
            {petCreated ? (
                <>
                    <h1>New pet ({formData.name}) was created!</h1>
                    <Button buttonClass='create-pet' handler={createAnotherPet} buttonText='Create another pet' />
                    <Link className='link' to={'/pets'}>Go to all pets</Link>
                </>
            ) : (
                <p>{errorMessages}</p>
            )}
        </Container>
        </PageWrapper>
    )
}
