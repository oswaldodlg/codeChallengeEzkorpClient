import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {

    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const { dispatch } = useAuthContext()

    const signup = async(email: string, displayName: string, password: string) => {
        setError(null)
        setIsPending(true)

        try {
            //SignUp User
            const res = await createUserWithEmailAndPassword(auth, email, password)
            console.log("User " + res.user.uid + " created successfully!");


            if (res === null){
                throw new Error('No se pudo registrar el usuario')
            }

            //add display name to user
            await updateProfile(res.user, {displayName: displayName })

            // dipatch login action
            dispatch({
                type: 'LOGIN',
                payload: res.user
            })

            
            if (!isCancelled){
                setIsPending(false)
                setError(null)
            }

        } catch (err: any){
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

    return {error, isPending, signup}
}