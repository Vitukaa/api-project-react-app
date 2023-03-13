import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from './components/Button'

export default function PetPage() {
    const { petId } = useParams()
    const navigate = useNavigate()

    const [pet, setPet] = useState('')
    const [isDeleted, setIsDeleted] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:3000/pets/${petId}?_expand=user`)
        .then(res => res.json())
        .then(petData => {
            console.log(petData)
            setPet(petData)
        })
    }, [])


    const deletePetHandler = () => {
        fetch(`http://localhost:3000/pets/${petId}`, {
            method: 'DELETE',
        });

        setIsDeleted(true)
    }


    const redirectToEditPetPage = () => {
        navigate(`./edit`)
    }


  return (
    <div>
        {pet && (
            <>
                {!isDeleted ? (
                    <>
                        <Button buttonClass='delete-button' handler={deletePetHandler} buttonText='Delete pet'/>
                        <Button buttonClass='edit-button' handler={redirectToEditPetPage} buttonText='Edit pet'/>
                        <h1>{pet.name}</h1>
                        <h2>Owner: {pet.user.name}</h2>
                        <ul>
                            <li>Age: {pet.age}</li>
                        </ul>
                        <div>
                            <img src={pet.image}></img>
                        </div>
                    </>
                ) : (
                    <>
                        <p>Pet ({pet.name}) deleted successfully</p>
                        <Link to={'/pets'}>Go to all pets</Link>
                    </>
                )}
            </>
        )}
    </div>
  )
}
