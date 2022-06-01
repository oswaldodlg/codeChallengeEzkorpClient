import {useState, useEffect} from 'react'
import { doc, updateDoc, arrayRemove} from "firebase/firestore";
import { db } from '../firebase/config';
import { ref, deleteObject} from 'firebase/storage';



export default function useDeleteActivity() {

    
    const [error, setError] = useState()
    const [isPending, setIsPending] = useState(false)
    

    const deleteActivity = async(id: string, date: string, activity: string) => {
       
        try {
        const userRef= await doc(db, 'users', id);
        
        await updateDoc(userRef, ({
            ['toDoActivities' + `.${date}`]: arrayRemove(activity) 
        }))

        setIsPending(false)

        } catch(err: any){
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
        }


    }


    return {deleteActivity , isPending, error}
}