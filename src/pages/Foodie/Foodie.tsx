import React, { useState } from 'react'
import axios from 'axios'
import './Foodie.css'

export default function Foodie() {
  const [isPending] = useState(false)
  const [error] = useState('')
  const [location, setLocation] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    // axios({
    //   method: 'get',
    //   url: 'https://api.uber.com/v1.2/products?latitude=37.7752315&longitude=-122.418075',
    //   headers: {
    //   'Access-Control-Allow-Origin': '*',
    //   Authorization: 'Bearer IA.VUNmGAAAAAAAEgASAAAABwAIAAwAAAAAAAAAEgAAAAAAAAGgAAAAFAAAAAAADgAQAAQAAAAIAAwAAAAOAAAAdAAAABwAAAAEAAAAEAAAAJqJ1MVe-BHlPl9cQooJybdOAAAA5Obelpua_z0C1kmW-jDrNCnrd-wxETxFps4o2dvdIRNHD1AwG-Oy8n2w-2jt77nex-DVSeBqOfzis5MZkwxc88hUToetwAS5sR4bMk5aAAAMAAAAnAsAL0JxNcqLeXy3JAAAAGIwZDg1ODAzLTM4YTAtNDJiMy04MDZlLTdhNGNmOGUxOTZlZQ'}
    // })
    // .then(res => {
    //   console.log(res)
    // })
    const axios = require("axios");

    const options = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
      params: {tags: 'vegetarian,dessert', number: '1'},
      headers: {
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
        'X-RapidAPI-Key': '6164b65938msh2e8276decfb5f62p1552a2jsn7c09e3483db9'
      }
    };

    axios.request(options).then(function (response: any) {
      console.log(response.data);
    }).catch(function (error : any) {
      console.error(error);
    });
    
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
