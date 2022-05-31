import React, { useState } from 'react'
import axios from 'axios'
import './Foodie.css'

export default function Foodie() {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState('')
  const [location, setLocation] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    axios({
      method: 'get',
      url: 'https://api.uber.com/v1/eats/stores?limit=10',
      headers: {
      'Content-Type':  'application/json',
      'Bearer': 'IA.VUNmGAAAAAAAEgASAAAABwAIAAwAAAAAAAAAEgAAAAAAAAGgAAAAFAAAAAAADgAQAAQAAAAIAAwAAAAOAAAAdAAAABwAAAAEAAAAEAAAABgD-JlxPhhtg_VNguHs00dOAAAAwjvFfUEkrhF2U90IdAZ7jf1luArp0hQzZcox9bSzPNoncHXTy7Q64sF-FCsfhXj38ezv_14zGopa5GLxI40YMcapzHplE5byltx5NZBoAAAMAAAAOd8EiyAqp07idyrWJAAAAGIwZDg1ODAzLTM4YTAtNDJiMy04MDZlLTdhNGNmOGUxOTZlZQ'}
    })
    .then(res => {
      console.log(res)
    })
    
  }
  return (
    <div className='main-container'>
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Dime qué comer...</h2>
      <label>
        <input 
        type='text'
        onChange={(e) => setLocation(e.target.value)}
        value={location}
        placeholder='Ubicacion'
        />
      </label>
      {isPending ? <button className='btn' disabled>Cargando...</button>
      :  <button className='btn'>Buscar</button>
      }
      { error && <p>{error}</p>}
    </form>
    </div>
  )
}
