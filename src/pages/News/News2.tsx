import axios from 'axios'
import { useEffect, useState } from 'react'
import './News.css'

const apiKey = 'pub_7855b7d09dcdbc3e7b317e8580f0d639765d'

export default function News() {
  const [category, setCategory] = useState('sports')
  const [news, setNews] = useState([])
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  useEffect(() => {

    setIsPending(true)
    axios.get(` https://newsdata.io/api/1/news?apikey=${apiKey}&q=mexico&country=mx&language=es&category=${category}`)
    .then(res => {
      console.log(res)
      setNews(res.data.results)
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
            <span>Categorias:</span>
            <label>
            <button className={category === 'sports' ? 'btn-selected' : 'btn-category'} onClick={() => setCategory('sports')}>Deportes</button>
            <button className={category === 'technology' ? 'btn-selected' : 'btn-category'} onClick={() => setCategory('technology')}>Tecnologia</button>
            <button className={category === 'entertainment' ? 'btn-selected' : 'btn-category'} onClick={() => setCategory('entertainment')}>Espectáculos</button>
            <button className={category === 'politics' ? 'btn-selected' : 'btn-category'} onClick={() => setCategory('politics')}>Politica</button>
            <button className={category === 'science' ? 'btn-selected' : 'btn-category'} onClick={() => setCategory('science')}>Ciencia</button>
            <button className={category === 'business' ? 'btn-selected' : 'btn-category'} onClick={() => setCategory('business')}>Negocios</button>
            </label>
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
            {doc.image_url ?<img src={doc.image_url} className='news-pic' alt='article-pic'/>
            : <img src={'https://tcass.com/images/blog/News-icon.png'} className='news-pic' alt='article-pic'/>
            }
              <div className='article-info'>
              <h3>{doc.title}</h3>
              <p>{doc.description && doc.description.slice(0, 140)}...</p>
              <button className='btn' onClick={() => window.open(doc.link)}>Ver más</button>
              </div>
            </div>
          )
        })}
      </div>
      </div>
    </div>
  )
}
