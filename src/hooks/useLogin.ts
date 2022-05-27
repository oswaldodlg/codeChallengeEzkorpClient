import { useEffect, useState } from "react"
import { auth } from "../firebase/config"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext"


export default function useLogin() {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async(email: string, password: string) => {
        setError(null)
        setIsPending(true)

        //sign the user out
        try{
            const res = await signInWithEmailAndPassword(auth, email, password)

            //dispatch logout action
            dispatch( {
                type: 'LOGIN',
                payload: res.user
            })

            //update state

            if (!isCancelled){
                setIsPending(false)
                setError(null)
            }

        } catch(err: any){
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
        }
    }

    useEffect(() => {    
      return () => {
        setIsCancelled(true)
      }
    }, [])
    

    return {login, error, isPending}
}
