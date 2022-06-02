import {useState, useEffect} from 'react';
import { db } from '../firebase/config';

//firebase Imports
import {collection, doc, onSnapshot} from 'firebase/firestore'

interface Data {
    toDoActivities : any
}

export const useGetActivities = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState<Data | any>(null);

    const getActivities = (id: string) => {
        setIsPending(true)
        let ref = collection(db, 'users')
        let activityRef = doc(ref, id)
        
        try {
            onSnapshot(activityRef, (doc) => {
                console.log("Current data: ", doc.data()); 
                setData(doc.data()) 
            })
            
            if (!isCancelled){
                setIsPending(false)
                setError(null)
            }
        

        } catch (err: any) {
            if (!isCancelled){
                console.log(err.message)
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
    
    return ({getActivities, data, isPending})
}