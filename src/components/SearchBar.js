import { useContext, useEffect, useState } from 'react'
import { ApiService } from '../services/ApiService'
import { Context } from '../store'
import { ActionTypes } from '../consts'

export const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [searchOptions, setSearchOptions] = useState([])
    const [globalState, dispatch] = useContext(Context)

    useEffect(() => {
        /* Debounce the search */
        const debounceOperation = setTimeout(async () => {
            if (searchTerm) {
                const autoCompleteData = await ApiService.getAutoCompleteData(searchTerm)
                if (autoCompleteData.results) {
                    if (autoCompleteData.results.length) {
                        setSearchOptions(autoCompleteData.results)
                    }
                    if (autoCompleteData.results.Code && autoCompleteData.results.Code === 'ServiceUnavailable') {
                        dispatch({ type: ActionTypes.HANDLE_API_ERROR })
                    }
                    return
                }
            }
            setSearchOptions([])
        }, 100)
        return () => clearTimeout(debounceOperation)
    }, [searchTerm])

    const cleanUp = () => {
        dispatch({ type: ActionTypes.TOGGLE_LOADER })
        setSearchOptions([])
        setSearchTerm('')
    }

    const setChosenLocation = async (location) => {
        dispatch({ type: ActionTypes.TOGGLE_LOADER })
        const forecastsData = await ApiService.getFiveDaysForecasts(location.Key)
        if (forecastsData.results && forecastsData.results.Code && forecastsData.results.Code === 'ServiceUnavailable') {
            dispatch({ type: ActionTypes.HANDLE_API_ERROR })
        } else {
            dispatch({ type: ActionTypes.SET_CHOSEN_LOCATION, payload: { location, forecastsData: forecastsData.results } })
        }
        cleanUp()
    }



    return (
        <div className="search-bar">
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search..." />
            <div className={`search-options-container ${searchOptions.length ? 'display' : ''}`}>
                {searchOptions.map(option => {
                    return (
                        <div onClick={() => {setChosenLocation(option)}} key={option.Key} className="search-option">
                            <span className="city-name">{option.AdministrativeArea.LocalizedName}</span>
                            <span className="country">, {option.Country.LocalizedName}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
