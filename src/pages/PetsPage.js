import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Container from './components/Container'
import PageWrapper from './components/PageWrapper'
import './styles/PetsPage.scss'

export default function PetsPage() {
    const [pets, setPets] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/pets?_expand=user`)
            .then(res => setPets(res.data))
    }, [])


    return (
        <PageWrapper>
            <Container>
                <h1>Pets page</h1>
                <Link className='link' to='/pets/new'>Create new pet</Link>
                <div className='pets-wrapper'>
                    {pets && (
                        pets.map((pet, index) => (
                            <div className='pet-wrapper' key={index}>
                                <Link className='image-link' to={'/pets/' + pet.id}>
                                    <h2>{pet.name}</h2>
                                    <img src={`${pet.image}`} alt={pet.species}></img>
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </Container>
        </PageWrapper>
    )
}
