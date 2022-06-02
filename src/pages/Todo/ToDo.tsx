import React, {useEffect, useState} from 'react'
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import './ToDo.css'
import moment from 'moment';
import { useAddActivities } from '../../hooks/useAddActivity';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useGetActivities } from '../../hooks/useGetActivities';
import useDeleteActivity from '../../hooks/useDeleteActivity';



export default function ToDo() {
  const [date, setDate] = useState<{} | any>(null);
  const [showModal, setShowModal] = useState(false)
  const [activity, setActivity] = useState('')

  const {addActivity, isPending} = useAddActivities()
  const {getActivities, data} = useGetActivities()
  const {user} = useAuthContext()

  useEffect(() => {
    getActivities(user.uid)
  }, [user])

  


  const handleSubmit = async(e: any) => {
    e.preventDefault()
    await addActivity(user.uid, moment(date).format('YYYY-MM-DD'), activity)
    setShowModal(false)
    setActivity('')
  }
 
  
  return (
    <div className='to-do-container'>
    <div>
    <DatePicker 
    inline
    selected={date}
    onChange={(date: any) => setDate(date)} />
    </div>
    <div className='activities-container'>
      
      {date && 
      <>
      <button onClick={() => setShowModal(true)} disabled={!date} className='add-btn'>Agregar Actividad</button>
      <h3>{moment(date).format('DD/MM/YYYY')}</h3>
      </>
      }
      {!date &&
      <>
        <h4>¡Hola {user.displayName}! Porfavor, seleccione una fecha</h4>
      </>}
      {showModal && (
      <div id="myModal" className="modal">
      <form className="modal-content" onSubmit={handleSubmit}>
        <div className="close" onClick={() => setShowModal(false)}>&times;</div>
        <textarea value={activity} onChange={(e) => setActivity(e.target.value)} placeholder="Agrega aqui tu actividad" />
        {!isPending ? <button type='submit' disabled={!activity} >Agregar</button>
        : <button type='submit' disabled >Agregando...</button>}
      </form>
      </div> 
      )}
      <div className='sticky-notes-container'>
      {date && data && data.toDoActivities[moment(date).format('YYYY-MM-DD')]?.map((act:any, index: number) => {
        return(
          <StickyNote key={index} act={act} id={user.uid} date={moment(date).format('YYYY-MM-DD')}/>
        )
      })}
      </div>
      
    </div>
    </div>
  )
}

const StickyNote = (props: any) => {
  const [isHovered, setIsHovered] = useState(false)

  const {deleteActivity} = useDeleteActivity()
  

  const handleDelete = (e: any) => {
    e.preventDefault()
    deleteActivity(props.id, props.date, props.act)
  }

  return(
          <div className='single-sticky-note' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <h5>{props.act}</h5>
            {isHovered && <button onClick={(e) => handleDelete(e)} className='delete-btn'>Eliminar</button>}
          </div>
  )
}
