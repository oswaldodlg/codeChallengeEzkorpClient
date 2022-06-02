import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Foodie.css'

const APP_ID = 'f73f48fb'
const APP_KEY = '74a46a439836c49c1ba80ce72f2c482f'

interface RandomDish {
  recipe: {
    label: '',
    url: '',
    ingredientLines: [],
    image: '',
  }
}


export default function Foodie() {
  const [isPending, setIsPending] = useState(false)
  const [error] = useState('')
  const [ingredient, setIngredient] = useState('chicken')
  const [cuisine, setCuisine] = useState('Mexican')
  const [mealTime, setMealTime] = useState('Breakfast')
  const [apiData, setApiData] = useState([])
  const [randomDish, setRandomDish] = useState<RandomDish | null>(null);

  useEffect(() => {
    setRandomDish(apiData[Math.floor(Math.random()*apiData.length)])
  }, [apiData])

  useEffect(() => {
    console.log(ingredient, cuisine, mealTime)
  }, [])
  
  
  const handleSubmit = (e: any) => {
    setIsPending(true)
    e.preventDefault()    
     const options = {
      method: 'get',
      url: `https://api.edamam.com/api/recipes/v2?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`,

      params: {q: ingredient, cuisineType: cuisine, mealType: mealTime, random: true },
      
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      }
    };

    

    axios.request(options).then(function (response: any) {
      setApiData(response.data.hits);
      setIsPending(false);
    }).catch(function (error : any) {
      console.error(error);
      setIsPending(false)
    });
    
  }
  return (
    <div className='main-container'>
    {!randomDish ?
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Dime qué comer...</h2>
      <label>
          Tipo de Proteina
          <select value={ingredient} onChange={(e) => setIngredient(e.target.value) }>
            <option value="chicken">Pollo</option>
            <option value="beef">Res</option>
            <option value="pork">Cerdo</option>
            <option value="fish">Pescado</option>
            <option value="eggs">Huevo</option>
          </select>
      </label>
      <label>
          Tipo de Cocina
          <select value={cuisine} onChange={(e) => setCuisine(e.target.value) }>
            <option value="Mexican">Mexicana</option>
            <option value="Mediterranean">Mediterranea</option>
            <option value="American">Americana</option>
            <option value="French">Francesa</option>
            <option value="Italian">Italiana</option>
            <option value="Asian">Asiatica</option>
          </select>
      </label>
      <label>
          Hora de la Comida
          <select value={mealTime} onChange={(e) => setMealTime(e.target.value) }>
            <option value="Breakfast">Desayuno</option>
            <option value="Lunch">Comida</option>
            <option value="Dinner">Cena</option>
          </select>
      </label>
      {isPending ? <button className='btn' disabled>Cargando...</button>
      :  <button className='btn'>Buscar</button>
      }
      { error && <p>{error}</p>}
    </form>
    : 
      <div className='recipe-container'>
        <h3 className='title'>{randomDish?.recipe.label}</h3>
        <img src={randomDish?.recipe.image} alt=""/>
        <label>
        Ingredients
        {randomDish?.recipe.ingredientLines.map((ingredient, index) => {
          return(
            <li key={index}>{ingredient}</li>
          )
        })}
        </label>
        <button className='btn' onClick={() => window.open(randomDish?.recipe.url)}>Ir a receta</button>
        <button className='btn' onClick={() => setRandomDish(null)}>Regresar</button>
      </div>
    }
    </div>
  )
}
