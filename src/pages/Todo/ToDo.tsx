import React, {useEffect, useState} from 'react'
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import './ToDo.css'
import moment from 'moment';

export default function ToDo() {
  const [date, setDate] = useState()
  const [showModal, setShowModal] = useState(false)
  const [activity, setActivity] = useState('')

  useEffect(() => {
   console.log(showModal)
  }, [showModal])

  
  
  return (
    <div className='to-do-container'>
    <div>
    <DatePicker 
    inline
    selected={date}
    locale="es"
    onChange={(date: any) => setDate(date)} />
    </div>
    <div className='activities-container'>
      <button onClick={() => setShowModal(true)} disabled={!date} className='add-btn'>Agregar Actividad</button>
      {date && <h3>{moment(date).format('DD/MM/YYYY')}</h3>}
      {showModal && 
      <div id="myModal" className="modal">
      <div className="modal-content">
        <div className="close" onClick={() => setShowModal(false)}>&times;</div>
        <textarea value={activity} onChange={(e) => setActivity(e.target.value)} placeholder="Agrega aqui tu actividad" />
        <button>Agregar</button>
      </div>
      </div>}
    </div>
    </div>
  )
}
