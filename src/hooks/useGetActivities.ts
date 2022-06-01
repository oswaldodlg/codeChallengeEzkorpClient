import {useState, useEffect} from 'react';
import { db } from '../firebase/config';

//firebase Imports
import {collection, doc, onSnapshot} from 'firebase/firestore'

interface Data {
    toDoActivities : any
}

export const useGetActivities = () => {
    const [details, setDetails] = useState(null)
    const [isPending, setIsPending] = useState(false)
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

        

        } catch (err) {

        }
    }   
    
    return ({getActivities, data, isPending})
}