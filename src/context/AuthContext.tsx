import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useReducer } from "react";
import {auth} from '../firebase/config';


interface AppContextInterface {
    user: any;
    authIsReady : boolean;
    dispatch: Function; 
  }

const initialState = { 
    user: null,
    authIsReady: false
 };
  

export const AuthContext = createContext({} as AppContextInterface);


type ACTIONTYPE =
  | { type: "LOGIN"; payload: any }
  | { type: "LOGOUT"}
  | { type: 'AUTH_IS_READY', payload: any}

function reducer(state: typeof initialState, action: ACTIONTYPE) {
switch (action.type) {
    case "LOGIN":
    return { ...state, user: action.payload};
    case "LOGOUT":
    return { ...state, user: null};
    case "AUTH_IS_READY":
    return { ...state, user: action.payload, authIsReady:true}
    default:
    return state;
}
}

export const AuthContextProvider = ({children}: any) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        onAuthStateChanged(auth, (user)=> {
                dispatch({ type: 'AUTH_IS_READY', payload: user})
        }) 
    }, [])
    

    console.log('AuthContext state:', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )

    
}