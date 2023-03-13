import React from 'react'
import { NavLink } from 'react-router-dom'
import JsonApi from '../MainPage'
import PetsPage from '../PetsPage'
import PostsPage from '../PostsPage'
import UsersPage from '../UsersPage'
import Container from './Container'
import './Navigation.scss'

export default function Navigation() {
    return (
        <div className='header'>
            <Container>
                <div className='main-header'>
                    <div className='logo-wrapper'>
                        <img src='https://cdn.pixabay.com/photo/2021/03/17/10/28/cat-6102014_960_720.png' alt='page-logo-cat-icon'></img>
                        <p className='site-title'>Paw lovers</p>
                    </div>
                    <ul className='menu-list'>
                        <li className='menu-item'>
                            <NavLink className='menu-link' to='/' element={<JsonApi />}>Main page</NavLink>
                        </li>
                        <li className='menu-item'>
                            <NavLink className='menu-link' to='/users' element={<UsersPage />}>Users</NavLink>
                        </li>
                        <li className='menu-item'>
                            <NavLink className='menu-link' to='/posts' element={<PostsPage />}>Posts</NavLink>
                        </li>
                        <li className='menu-item'>
                            <NavLink className='menu-link' to='/pets' element={<PetsPage />}>Pets</NavLink>
                        </li>
                    </ul>
                </div>
            </Container>
        </div>
    )
}
