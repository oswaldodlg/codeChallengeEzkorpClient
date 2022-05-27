import {useState} from 'react'
import { useSignUp } from '../../hooks/useSignUp'
import './Register.css'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')

  const {error, isPending, signup } = useSignUp()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    signup(email, displayName, password)
  }

  return (
    <form onSubmit={handleSubmit} className='signup-form'>
      <h2>Registro</h2>
      <label>
        <span>email:</span>
        <input 
        type='email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        />
      </label>
      <label>
        <span>Nombre de Usuario:</span>
        <input type='text'
        onChange={(e) => setDisplayName(e.target.value)}
        value={displayName}
        />
      </label>
      <label>
        <span>contraseña:</span>
        <input type='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        />
      </label>
      {isPending ? <button className='btn' disabled>Cargando...</button>
      :  <button className='btn'>Aceptar</button>
      }
      { error && <p>{error}</p>}
    </form>
  )
}
