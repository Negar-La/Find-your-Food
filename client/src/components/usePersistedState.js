import { useEffect, useState } from "react";

const usePersistedState= (defaultValue, key)=>{

//from react context workshop and then change localStorage to sessionStorage!
    
    const [state, setState] = useState(()=>{
        
        const storedValue= window.sessionStorage.getItem(key)
        return storedValue !== null ? JSON.parse(storedValue) :  defaultValue
    }) 

    useEffect(()=>{
        window.sessionStorage.setItem(key , JSON.stringify(state))
    }, [state])

    return [state  , setState]

}
export default usePersistedState;