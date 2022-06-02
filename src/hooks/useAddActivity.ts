import {useState, useEffect} from 'react';
import { db } from '../firebase/config';

//firebase Imports
import {arrayUnion, collection, doc, updateDoc} from 'firebase/firestore'

interface Data {
    toDoActivities : any
}

export const useAddActivities = () => {
    const [isPending, setIsPending] = useState(false)
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)

    const addActivity = async(id: string, date: any, activity: string) => {
        setIsPending(true)
        let ref = collection(db, 'users')
        let activityRef = doc(ref, id)
        
        try {
            await updateDoc(activityRef, {
                ["toDoActivities"+`.${date}`]: arrayUnion(activity)
              });
            if (!isCancelled){
                setIsPending(false)
                setError(null)
            }
            
        } catch (err : any) {
            if (!isCancelled){
            console.log(err)
            setError(err.message)
            setIsPending(false)
            }
        }
    } 

    useEffect(() => {    
        return () => {
          setIsCancelled(true)
        }
      }, [])
    
    return ({addActivity, isPending, error})
}