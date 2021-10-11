import { createContext, useReducer } from 'react'
import { ActionTypes } from '../consts'
import { enrichData } from '../utils'

/* Main Reducer */
export const Reducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.SET_CHOSEN_LOCATION:
            enrichData(action.payload.forecastsData)
            return {
                ...state,
                error: null,
                forecastsData: action.payload.forecastsData,
                location: action.payload.location,
            }
        case ActionTypes.TOGGLE_LOADER:
            return {
                ...state,
                error: null,
                isLoading: !state.isLoading
            }
        case ActionTypes.HANDLE_API_ERROR:
            return {
                ...state,
                error: 'Service Unavailable, please try again later'
            }
        default:
            return state
    }
}


const initialGlobalState = { location: null, forecastsData: null, isLoading: false, error: null }

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialGlobalState)
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}

export const Context = createContext(initialGlobalState)
export default Store
