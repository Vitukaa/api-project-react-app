import React from 'react'
import { NavLink } from 'react-router-dom'
import JsonApi from '../MainPage'
import PetsPage from '../PetsPage'
import UsersPage from '../UsersPage'
import './Navigation.css'

export default function Navigation() {
  return (
    <div>
        <ul>
          <li>
            <NavLink to='/' element={<JsonApi />}>Main page</NavLink>
          </li>
          <li>
            <NavLink to='/users' element={<UsersPage />}>Users</NavLink>
          </li>
          <li>
            <NavLink to='/pets' element={<PetsPage />}>Pets</NavLink>
          </li>
        </ul>
    </div>
  )
}
