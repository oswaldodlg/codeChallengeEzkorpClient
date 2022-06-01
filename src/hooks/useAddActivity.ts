import {useState, useEffect} from 'react';
import { db } from '../firebase/config';

//firebase Imports
import {arrayUnion, collection, doc, updateDoc} from 'firebase/firestore'

interface Data {
    toDoActivities : any
}

export const useAddActivities = () => {
    const [details, setDetails] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState('')

    const addActivity = async(id: string, date: any, activity: string) => {
        setIsPending(true)
        let ref = collection(db, 'users')
        let activityRef = doc(ref, id)
        
        try {
            await updateDoc(activityRef, {
                ["toDoActivities"+`.${date}`]: arrayUnion(activity)
              });
            setIsPending(false)
        } catch (err : any) {
            console.log(err)
            setError(err.message)
            setIsPending(false)
        }
    }   
    
    return ({addActivity, isPending, error})
}