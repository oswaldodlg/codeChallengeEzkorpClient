import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './News.css'

export default function News() {
  const [country, setCountry] = useState('')
  const [category, setCategory] = useState('sports')
  const [news, setNews] = useState([])
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  useEffect(() => {

    setIsPending(true)
    axios.get(`https://newsapi.org/v2/top-headlines?country=mx&category=${category}&apiKey=ad93b31d9fc74dff8e2c454c70421a6f`)
    .then(res => {
      console.log(res.data.articles)
      setNews(res.data.articles)
      setIsPending(false)
    })
  }, [category])
  
 
  return (
    <div className='container'>
      
      <div className='news-container'>
      <div className='card'>
        <h2>Panel de Noticias</h2>
        <form onSubmit={handleSubmit}>
            {/* <label>
            <span>Pais de interes:</span>
            <input type='text' onChange={(e) => setCountry(e.target.value)} value={country}/>
            </label> */}
            <label>
            <span>Categorias:</span>
            <button className={category === 'sports' ? 'btn-selected' : 'btn-category'} onClick={() => setCategory('sports')}>Deportes</button>
            <button className={category === 'technology' ? 'btn-selected' : 'btn-category'} onClick={() => setCategory('technology')}>Tecnologia</button>
            <button className={category === 'entertainment' ? 'btn-selected' : 'btn-category'} onClick={() => setCategory('entertainment')}>Espectáculos</button>
            <button className={category === 'health' ? 'btn-selected' : 'btn-category'} onClick={() => setCategory('health')}>Salud</button>
            <button className={category === 'science' ? 'btn-selected' : 'btn-category'} onClick={() => setCategory('science')}>Ciencia</button>
            <button className={category === 'business' ? 'btn-selected' : 'btn-category'} onClick={() => setCategory('business')}>Negocios</button>

            {/* <input type='text' onChange={(e) => setCategory(e.target.value)} value={category}/> */}
            </label>
          
          {/* <button className='btn' style={{display: 'block', justifyContent: 'center', margin: '20px auto'}}>Buscar</button> */}
        </form>
      </div>
      <div className='card-news'>
        {isPending && 
        <>
          <h2>Cargando...</h2>
        </>}
        {news && !isPending && news.map((doc: any) => {
          return(
            <div className='article-container'>
            {doc.urlToImage && <img src={doc.urlToImage} className='news-pic'/>}
              <div className='article-info'>
              <h3>{doc.title}</h3>
              <p>{doc.description}</p>
              <button className='btn' onClick={() => window.open(doc.url)}>Ver más</button>
              </div>
            </div>
          )
        })}
      </div>
      </div>
    </div>
  )
}
