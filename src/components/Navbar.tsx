import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className='navbar'>
        <ul>
            <li className='title'>Code Challenge</li>

            <li><Link to="/login">Login</Link></li>
            <li><Link to="register">Registro</Link></li>
        </ul>

    </nav>
  )
}
