import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from './components/Button'
import Container from './components/Container'
import PageWrapper from './components/PageWrapper'
import './styles/PetPage.scss'

export default function PetPage() {
    const { petId } = useParams()
    const navigate = useNavigate()

    const [pet, setPet] = useState('')
    const [isDeleted, setIsDeleted] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:3000/pets/${petId}?_expand=user`)
        .then(res => res.json())
        .then(petData => {
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
    <PageWrapper>
        {pet && (
            <Container>
                {!isDeleted ? (
                    <>
                        <Button buttonClass='delete-button' handler={deletePetHandler} buttonText='Delete pet'/>
                        <Button buttonClass='edit-button' handler={redirectToEditPetPage} buttonText='Edit pet'/>
                        <h1 className='title'>{pet.name}</h1>
                        <h2 className='subtitle'>Owner: {pet.user.name}</h2>
                        <h3 className='list-title'>Additional info:</h3>
                        <ul className='info-list'>
                            <li className='info-item'>Age: {pet.age}</li>
                        </ul>
                        <div className='image-wrapper'>
                            <img src={pet.image}></img>
                        </div>
                    </>
                ) : (
                    <>
                        <h1>Pet ({pet.name}) deleted successfully</h1>
                        <Link className='link' to={'/pets'}>Go to all pets</Link>
                    </>
                )}
            </Container>
        )}
    </PageWrapper>
  )
}
