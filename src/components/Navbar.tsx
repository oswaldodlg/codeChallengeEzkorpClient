import { Link } from 'react-router-dom';
import './Navbar.css';
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';

export default function Navbar() {
  const {logout} = useLogout()

  const {user} = useAuthContext()

  
  return (
    <nav className='navbar'>
        <ul>
            <li className='title'>Code Challenge</li>
            {user === null && (
                <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Registro</Link></li>
                </>
            )}
            
            {user !== null && (
            <>
            <li><Link to="/">ToDo</Link></li>
            <li><Link to="/News">Noticias</Link></li>
            <li><Link to="/Foodie">Foodie</Link></li>
            {/* <li> hola, {user.displayName} </li> */}
            <li>  
            <button className='btn' onClick={logout}>Cerrar Sesion</button>
            </li>
            </>
            )}

        </ul>

    </nav>
  )
}


{/* <div class="topnav" id="myTopnav">
  <a href="#home" class="active">Home</a>
  <a href="#news">News</a>
  <a href="#contact">Contact</a>
  <a href="#about">About</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
    <i class="fa fa-bars"></i>
  </a>
</div> */}