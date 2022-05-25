import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { db, auth } from "../firebase/config";

export const useSignUp = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const signup = async(email: string, displayName: string, password: string) => {
        setError(null)
        setIsPending(true)

        try {
            //SignUp User
            const res = await createUserWithEmailAndPassword(auth, email, password)
            console.log("User " + res.user.uid + " created successfully!");
            console.log(res.user)

            if (res === null){
                throw new Error('No se pudo registrar el usuario')
            }

            //add display name to user
            await updateProfile(res.user, {displayName: displayName })

            setIsPending(false)
            setError(null)

        } catch (err: any){
            console.log(err.message)
            setError(err.message)
        }
    }

    return {error, isPending, signup}
}