import { signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        //sign the user out
        try{
            await signOut(auth)

            //dispatch logout action
            dispatch( {
                type: 'LOGOUT'
            })

            //update state

            if (!isCancelled){
                setIsPending(false)
                setError(null)
            }

           
        } catch(err: any){
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
    

    return {logout, error, isPending}
}