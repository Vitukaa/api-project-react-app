import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "./components/Container";
import PageWrapper from "./components/PageWrapper";
import './styles/MainPage.scss'

export default function MainPage() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/users/?_embed=pets`)
            .then(res => res.json())
            .then(usersData => {
                console.log(usersData)
                setUsers(usersData)
            })
    }, [])



    return (
      <PageWrapper>
        <Container>
            <h1 className='main-title'>Welcome to pet lovers blog!</h1>
            <h2 className='main-subtitle'>Top writers:</h2>
            <div className='top-wrapper'>
            {users.slice(0, 6).map((user, index) => (
                <div className='user-card' key={index}>
                    <Link to={'/users/' + user.id}>
                        <h3 className='user-title'>{user.name}</h3>
                        <h4 className='user-username'>{user.username}</h4>
                    </Link>
                    <div className='pets-wrapper' key={index}>
                        {user.pets && user.pets.length > 0 && (
                            user.pets.map((pet, index) => (
                                <Link to={'/pets/' + pet.id} key={index}>
                                    <div className='pet-wrapper' key={index}>
                                        <h3>{pet.name}</h3>
                                        <img src={pet.image}></img>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            ))}
            </div>
        </Container>
      </PageWrapper>
    )
}
