import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './PetsPage.css'

export default function PetsPage() {
    const [pets, setPets] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/pets?_expand=user`)
            .then(res => res.json())
            .then(petsData => {
                setPets(petsData)
            })
    }, [])

    console.log(pets)

    return (
        <div>
            <h1>Pets page</h1>
            <Link to='/pets/new'>Create new pet</Link>
            {pets && (
                pets.map((pet, index) => (
                    <div key={index}>
                        <h2>
                            <Link to={'/pets/' + pet.id}>
                                {pet.name}
                            </Link>
                        </h2>
                        <ul>
                            <li>Age: {pet.age}</li>
                            <li>Owner name: {pet.user.name}</li>
                        </ul>
                        <img src={`${pet.image}`} alt={pet.species}></img>
                    </div>
                ))

            )}
        </div>
    )
}
