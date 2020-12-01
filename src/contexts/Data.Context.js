import React, { createContext, useReducer, useEffect } from "react"
import { dataReducer } from "../reducers/Data.Reducer"

export const DataContext = createContext()

const DataContextProvider = (props) => {
    const [userData, dispatch] = useReducer(dataReducer, {})

    return (
        <DataContext.Provider value={{userData, dispatch}}>
            { props.children }
        </DataContext.Provider>
    )
}

export default DataContextProvider
